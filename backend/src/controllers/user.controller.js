import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Quiz } from "../models/quiz.model.js";

async function deleteFromCloudinary(imageUrl) {
  try {
      const publicId = extractPublicIdFromUrl(imageUrl); // You need to extract the public ID from the URL
      const result = await cloudinary.uploader.destroy(publicId);
      return { success: true, result };
  } catch (error) {
      return { success: false, error };
  }
}

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    // finduser from it's userId
    const user = await User.findById(userId);

    // generate access token and refresh token
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // save refresh token in db as it is a time taking process we
    // use the await operation.

    // we only save refresh token in db.
    user.refreshToken = refreshToken;

    // becuase we don't have to validate pass and all every time.
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  const { username, email, password, classname } = req.body;

  // console.log(req.body);

  // validation - not empty
  if (
    // trim function removes the white spaces from the both ends of string.
    [username, email, password, classname].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // check if user already exists: username
  const existedUser = await User.findOne({ username });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  // console.log(req.files);

  let profilePictureLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.profilePicture) &&
    req.files.profilePicture.length > 0
  ) {
    profilePictureLocalPath = req.files.profilePicture[0].path;
  }

  const profilePicture = await uploadOnCloudinary(profilePictureLocalPath);

  // create user object - create entry in db.
  const user = await User.create({
    username,
    email,
    password,
    classname,
    profilePicture: profilePicture?.url || "",
    bio: req.body.bio || "",
  });

  // remove password and refresh token field from response
  // note that mongodb assigns _id to every document by default
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // check for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // return res
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  //find the user
  //password check
  //access and referesh token
  //send cookie

  // req body -> data
  const { username, password } = req.body;

  // console.log(req.body);

  // both fields are required for login.
  if (!username || !password) {
    throw new ApiError(400, "username or email is required");
  }

  // console.log("Ok");
  // find user by username
  const user = await User.findOne({
    username,
  });

  // check if user exists
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  // check if password is correct (done by bcypt)
  const isPasswordValid = await user.isPasswordCorrect(password);

  // console.log(password);
  // if password is not valid
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  // generate access token and refresh token
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  // remove password and refresh token field from response
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // set options for cookies
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  };

  // send response
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully !!"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  // console.log(req.user);
  // console.log(userId);

  // whenever you do aggregation you have to analyze response first
  // and then design the frontend.

  // Aggregation pipeline to fetch user details and quiz history
  const userWithQuizHistory = await User.aggregate([
    { $match: { _id: userId } }, // Match the specific user by ID
    { 
      $unwind: { 
        path: "$quizData", 
        preserveNullAndEmptyArrays: true // Preserve documents with empty or null quizData
      } 
    },
    {
      $lookup: {
        from: "quizzes", // Quiz collection name
        localField: "quizData.quiz", // Reference field in User model
        foreignField: "_id", // Matching field in Quiz model
        as: "quizDetails", // Alias for the matched Quiz documents
      },
    },
    {
      $unwind: { 
        path: "$quizDetails", 
        preserveNullAndEmptyArrays: true // Preserve documents even if quizDetails is empty
      },
    },
    {
      $project: {
        username: 1, // Include user fields
        email: 1,
        classname: 1,
        profilePicture: 1,
        bio: 1,
        totalQuizzesGiven: 1,
        maxScore: 1,
        minScore: 1,
        accuracy: 1,
        quizData: {
          quiz: {
            subject: "$quizDetails.subject", // Include only `subject` from Quiz model
            topic: "$quizDetails.topic", // Include only `topic` from Quiz model
          },
          quizDate: "$quizData.quizDate", // Include `quizDate` from quizData
          score: "$quizData.score", // Include `score` from quizData
        },
      },
    },
    {
      $group: {
        _id: "$_id", // Group back by user
        username: { $first: "$username" }, // Include user's name
        email: { $first: "$email" }, // Include user's email
        quizData: { $push: "$quizData" }, // Combine all quizData entries
        classname: { $first: "$classname" }, // Include user's class
        profilePicture: { $first: "$profilePicture" }, // Include user's profile picture
        bio: { $first: "$bio" }, // Include user's bio
        totalQuizzesGiven: { $first: "$totalQuizzesGiven" }, // Include total quizzes given
        maxScore: { $first: "$maxScore" }, // Include max score
        minScore: { $first: "$minScore" }, // Include min score
        accuracy: { $first: "$accuracy" }, // Include accuracy
      },
    },
  ]);

  if (!userWithQuizHistory.length) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }

  // Return the user details with quiz history
  return res
    .status(200)
    .json(
      new ApiResponse(200, userWithQuizHistory[0], "User fetched successfully")
    );
});


const getAllQuizzes = asyncHandler(async (req, res) => {
  try {
    const quizzes = await Quiz.fetchAllQuizzes(); // Call the static method

    const userid = req.user?._id; // Assuming req.user contains the authenticated user data
    res.status(200).json({
      success: true,
      data: {
        quizzes,
        userid,
      },
    });
  } catch (error) {
    console.error("Error fetching quizzes:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch quizzes",
    });
  }
});

const getAllQuizzesnotsignedup = asyncHandler(async (req, res) => {
  try {
    const quizzes = await Quiz.fetchAllQuizzes(); // Call the static method

    res.status(200).json({
      success: true,
      data: quizzes,
    });
  } catch (error) {
    console.error("Error fetching quizzes:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch quizzes",
    });
  }
});

const getquizdetails = asyncHandler(async (req, res) => {
  try {
    const { userid, quizid } = req.params;

    // console.log(req.params);
    // console.log(userid, quizid);

    const quiz = await Quiz.findById(quizid);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        quiz,
        userid,
      },
    });
  } catch (error) {
    console.error("Error fetching quiz:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch quiz",
    });
  }
});

const updateQuizHistory = asyncHandler(async (req, res) => {
  try {
    const { userid, quizid } = req.params; // Get userId and quizId from URL parameters
    const { score, quizDate } = req.body; // Get score and quizDate from the request body

    // console.log(userid, quizid, score, quizDate);

    // Find the user by userId
    const user = await User.findById(userid);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the quiz by quizId (optional, for validation or any other reason)
    const quiz = await Quiz.findById(quizid);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    // Create a new quiz history entry
    const newQuizHistory = {
      quiz: quizid, // The quizId for the user's history
      score: score, // The score obtained in the quiz
      quizDate: quizDate, // The date when the quiz was taken
    };

    // Update the user's quiz history
    user.quizData.push(newQuizHistory);

    // Update the user's total quizzes given, max score, etc.
    user.totalQuizzesGiven += 1;
    user.maxScore = Math.max(user.maxScore, score);
    
    if(user.totalQuizzesGiven === 1) {
      user.minScore = score;
    }
    else{
      user.minScore = Math.min(user.minScore, score);
    }
    user.accuracy = parseFloat(
      ((user.totalQuizzesGiven - 1) * user.accuracy + score) /
        user.totalQuizzesGiven
    ).toFixed(2);

    // Save the updated user document
    await user.save({ validateBeforeSave: false });

    // Respond with success
    res.status(200).json({
      success: true,
      message: "Quiz history updated successfully",
    });
  } catch (error) {
    console.error("Error updating quiz history:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update quiz history",
    });
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.fetchAllUsers(); // Call the static method

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
});

const updateDetails = asyncHandler (async (req, res) => {
  try {
    const { fieldType, value } = req.body;
    const userId = req.user?._id;

    // Validate required fields
    if (!fieldType || !value || !userId) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // Handle update based on fieldType
    let updatedUser;

    switch (fieldType) {
      case 'username':
        // Check uniqueness for username
        const existingUser = await User.findOne({ username: value });
        if (existingUser) {
          return res.status(409).json({ message: 'Username already exists.' });
        }
        updatedUser = await User.findByIdAndUpdate(
          userId,
          { $set: { username: value } },
          { new: true, validateBeforeSave: false }
        );
        break;

      case 'email':
        // Check uniqueness for email
        const existingEmail = await User.findOne({ email: value });
        if (existingEmail) {
          return res.status(409).json({ message: 'Email already exists.' });
        }
        updatedUser = await User.findByIdAndUpdate(
          userId,
          { $set: { email: value } },
          { new: true, validateBeforeSave: false }
        );
        break;

      case 'class':
        // Directly update class (no additional validation needed)
        updatedUser = await User.findByIdAndUpdate(
          userId,
          { $set: { classname: value } },
          { new: true, validateBeforeSave: false }
        );
        break;

      case 'bio':
        // Directly update bio (no additional validation needed)
        updatedUser = await User.findByIdAndUpdate(
          userId,
          { $set: { bio: value } },
          { new: true, validateBeforeSave: false }
        );
        break;

      default:
        return res.status(400).json({ message: 'Invalid field type.' });
    }

    // Check if user was updated
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Return success response
    return res.status(200).json({
      message: `${fieldType} updated successfully.`,
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating details:', error);
    return res.status(500).json({ message: 'An error occurred while updating details.' });
  }
});

const updateProfilePicture = asyncHandler(async(req, res) => {
  const localpath = req.file?.path;

  if (!localpath) {
    throw new ApiError(400, "Profile Picture file is missing");
  }
  
  const profilepic = await uploadOnCloudinary(localpath);

  if (!profilepic.url) {
    throw new ApiError(400, "Error while uploading a picture");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        profilePicture: profilepic.url,
      },
    },
    { new: true, validateBeforeSave: false }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile picture updated successfully"));
})

const changeCurrentPassword = asyncHandler(async(req, res) => {
  // always use those names which are there in req.body i mean
  // sent from the response body.
  
  const {currentPassword, newPassword} = req.body

  const user = await User.findById(req.user?._id)
  const isPasswordCorrect = await user.isPasswordCorrect(currentPassword)

  if (!isPasswordCorrect) { 
      throw new ApiError(400, "Invalid current password");
  }

  user.password = newPassword
  await user.save({validateBeforeSave: false})

  return res
  .status(200)
  .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const checkForLogin = asyncHandler(async (req, res) => {
  
  const token = req.cookies?.accessToken;

  // console.log(req.cookies);

  if (!token) {
      return res.status(200).json({
          isLoggedIn: false
      })
  }

  else{
      return res.status(200).json({
          isLoggedIn: true
      })
  }

});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  getAllQuizzes,
  getquizdetails,
  updateQuizHistory,
  getAllUsers,
  getAllQuizzesnotsignedup,
  updateDetails,
  updateProfilePicture,
  changeCurrentPassword,
  checkForLogin
};

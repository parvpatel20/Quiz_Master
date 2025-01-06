import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
    classname: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    profilePicture: {
      type: String, // URL or file path
    },
    totalQuizzesGiven: {
      type: Number,
      default: 0,
    },
    maxScore: {
      type: Number,
      default: 0,
    },
    minScore: {
      type: Number,
      default: 0,
    },
    accuracy: {
      type: Number,
      default: 0,
    },
    refreshToken: {
      type: String,
    },
    quizData: [
      {
        quiz: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Quiz',
        },
        quizDate: {
          type: Date, // Store the date when the user gave this quiz
          required: true,
          default: Date.now, // Defaults to the current date
        },
        score: {
          type: Number, // Optional: store the user's score for this quiz
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

// Hash the password before saving the User
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// Check if the password is correct
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

// Generate access token and refresh token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.statics.fetchAllUsers = async function () {
  try {
    return await this.find(); // Fetch all documents
  } catch (error) {
      console.log("error comes from the model function");
    throw error;
  }
};

// Create and export the User model
const User = mongoose.model('User', userSchema);

export {User};

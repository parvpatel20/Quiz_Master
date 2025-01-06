import { Router } from "express";
import { 
    loginUser,
    logoutUser, 
    registerUser,
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
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.single("profilePicture"),
    registerUser)

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT,  logoutUser)

router.route("/profile").get(verifyJWT, getCurrentUser)

router.route("/quiz-search").get(verifyJWT, getAllQuizzes)

router.route("/quiz-search-before-signup").get(getAllQuizzesnotsignedup)

router.route("/quiz-page/:userid/:quizid").get(verifyJWT, getquizdetails)

router.route("/quiz-page/:userid/:quizid").post(verifyJWT, updateQuizHistory)

router.route("/leaderboard").get(verifyJWT, getAllUsers)

router.route("/profile").patch(verifyJWT, updateDetails)

router.route("/profile-picture").patch(verifyJWT, upload.single("profilePicture"), updateProfilePicture);

router.route("/change-password").patch(verifyJWT, changeCurrentPassword)

router.route("/check-login-status").get(checkForLogin)

export default router
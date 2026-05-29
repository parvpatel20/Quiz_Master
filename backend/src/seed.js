/**
 * Seed script — populates the database with sample quizzes and users so every
 * feature (discovery, quiz play, answer review, bookmarks, profile analytics,
 * dashboard charts, leaderboard) is testable.
 *
 * Run:  cd backend && npm run seed
 * WARNING: this WIPES the User and Quiz collections, then re-inserts samples.
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db/index.js";
import { User } from "./models/user.model.js";
import { Quiz } from "./models/quiz.model.js";

dotenv.config({ path: "./.env" });

const PASSWORD = "Test@123"; // shared password for every sample account
const daysAgo = (n) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);

/* ------------------------------------------------------------------ */
/* Quizzes — cover all 4 formats, 3 difficulties, several subjects     */
/* ------------------------------------------------------------------ */
const QUIZZES = [
  {
    quizName: "Algebra Basics",
    class: "8", subject: "Mathematics", topic: "Algebra",
    format: "MCQ-Single", difficulty: "easy", totalTime: 10,
    questions: [
      { questionText: "Solve for x: x + 5 = 12", options: ["5", "7", "12", "17"], correctOption: [1] },
      { questionText: "What is 3x when x = 4?", options: ["7", "12", "34", "1"], correctOption: [1] },
      { questionText: "Simplify: 2(x + 3)", options: ["2x + 3", "2x + 6", "x + 6", "2x + 5"], correctOption: [1] },
      { questionText: "If y = 2x and x = 5, find y", options: ["10", "7", "25", "2"], correctOption: [0] },
    ],
  },
  {
    quizName: "Fractions Made Easy",
    class: "6", subject: "Mathematics", topic: "Fractions",
    format: "MCQ-Single", difficulty: "easy", totalTime: 8,
    questions: [
      { questionText: "1/2 + 1/4 = ?", options: ["1/6", "3/4", "2/6", "1/8"], correctOption: [1] },
      { questionText: "Which is larger?", options: ["1/3", "1/2", "1/4", "1/5"], correctOption: [1] },
      { questionText: "Simplify 4/8", options: ["1/2", "2/4", "4/8", "1/4"], correctOption: [0] },
    ],
  },
  {
    quizName: "States of Matter",
    class: "6", subject: "Science", topic: "States of Matter",
    format: "MCQ-Multiple", difficulty: "medium", totalTime: 10,
    questions: [
      { questionText: "Which of these are states of matter?", options: ["Solid", "Energy", "Liquid", "Gas"], correctOption: [0, 2, 3] },
      { questionText: "Which can change shape to fit a container?", options: ["Solid", "Liquid", "Gas", "Crystal"], correctOption: [1, 2] },
      { questionText: "Select properties of solids.", options: ["Fixed shape", "Fixed volume", "Flows freely", "Compressible easily"], correctOption: [0, 1] },
    ],
  },
  {
    quizName: "The Human Body",
    class: "7", subject: "Science", topic: "Human Body",
    format: "True/False", difficulty: "easy", totalTime: 6,
    questions: [
      { questionText: "The heart pumps blood through the body.", isCorrect: true },
      { questionText: "Humans have three lungs.", isCorrect: false },
      { questionText: "The skeleton protects internal organs.", isCorrect: true },
      { questionText: "The brain is part of the digestive system.", isCorrect: false },
    ],
  },
  {
    quizName: "Parts of Speech",
    class: "5", subject: "English", topic: "Parts of Speech",
    format: "Fill-in-the-Blank", difficulty: "easy", totalTime: 8,
    questions: [
      { questionText: "A word that names a person, place, or thing is a ____.", correctAnswer: "noun" },
      { questionText: "A word that describes an action is a ____.", correctAnswer: "verb" },
      { questionText: "A word that describes a noun is an ____.", correctAnswer: "adjective" },
    ],
  },
  {
    quizName: "English Tenses",
    class: "8", subject: "English", topic: "Tenses",
    format: "MCQ-Single", difficulty: "medium", totalTime: 10,
    questions: [
      { questionText: "She ____ to school every day.", options: ["go", "goes", "going", "gone"], correctOption: [1] },
      { questionText: "Identify the past tense of 'run'.", options: ["runned", "ran", "running", "runs"], correctOption: [1] },
      { questionText: "They ____ playing right now.", options: ["is", "am", "are", "be"], correctOption: [2] },
    ],
  },
  {
    quizName: "Laws of Motion",
    class: "9", subject: "Physics", topic: "Motion",
    format: "MCQ-Single", difficulty: "hard", totalTime: 12,
    questions: [
      { questionText: "Newton's first law is also called the law of ____.", options: ["Gravity", "Inertia", "Energy", "Momentum"], correctOption: [1] },
      { questionText: "Unit of force is the:", options: ["Joule", "Watt", "Newton", "Pascal"], correctOption: [2] },
      { questionText: "F = m × ___", options: ["velocity", "acceleration", "distance", "time"], correctOption: [1] },
      { questionText: "Acceleration due to gravity (approx) is:", options: ["9.8 m/s²", "98 m/s²", "0.98 m/s²", "8.9 m/s²"], correctOption: [0] },
    ],
  },
  {
    quizName: "Quantum Mechanics Intro",
    class: "12 (Science)", subject: "Physics", topic: "Quantum Mechanics",
    format: "MCQ-Multiple", difficulty: "hard", totalTime: 15,
    questions: [
      { questionText: "Select quantum phenomena.", options: ["Superposition", "Friction", "Entanglement", "Tunneling"], correctOption: [0, 2, 3] },
      { questionText: "Which are valid quantum particles?", options: ["Photon", "Electron", "Pixel", "Quark"], correctOption: [0, 1, 3] },
    ],
  },
  {
    quizName: "World Facts",
    class: "7", subject: "General Knowledge", topic: "World Facts",
    format: "True/False", difficulty: "easy", totalTime: 6,
    questions: [
      { questionText: "The Sahara is the largest hot desert.", isCorrect: true },
      { questionText: "Mount Everest is the deepest ocean trench.", isCorrect: false },
      { questionText: "The Nile is a river in Africa.", isCorrect: true },
    ],
  },
  {
    quizName: "Programming Basics",
    class: "10", subject: "Computer Science", topic: "Programming",
    format: "MCQ-Single", difficulty: "medium", totalTime: 10,
    questions: [
      { questionText: "Which keyword declares a constant in JavaScript?", options: ["var", "let", "const", "fix"], correctOption: [2] },
      { questionText: "What does HTML stand for?", options: ["Hyper Trainer Markup Language", "HyperText Markup Language", "HighText Machine Language", "None"], correctOption: [1] },
      { questionText: "Which symbol starts a single-line comment in JS?", options: ["#", "//", "<!--", "%"], correctOption: [1] },
      { questionText: "Arrays in JS are zero-indexed.", options: ["True", "False"], correctOption: [0] },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Helper: build a user with computed stats from a list of attempts    */
/* ------------------------------------------------------------------ */
function buildUser({ username, email, classname, bio, attempts, bookmarks = [] }) {
  const quizData = attempts.map(({ quizId, score, day }) => ({
    quiz: quizId,
    score,
    quizDate: daysAgo(day),
  }));
  const scores = quizData.map((q) => q.score);
  const total = scores.length;
  return {
    username,
    email,
    password: PASSWORD,
    classname,
    bio: bio || "",
    profilePicture:
      "https://res.cloudinary.com/dfamhizhm/image/upload/v1751081474/logo_mr08jt.png",
    totalQuizzesGiven: total,
    maxScore: total ? Math.max(...scores) : 0,
    minScore: total ? Math.min(...scores) : 0,
    accuracy: total ? Math.round(scores.reduce((a, b) => a + b, 0) / total) : 0,
    quizData,
    bookmarks,
  };
}

async function seed() {
  await connectDB();

  console.log("Clearing existing users and quizzes…");
  await User.deleteMany({});
  await Quiz.deleteMany({});

  console.log("Inserting quizzes…");
  const quizzes = await Quiz.insertMany(
    QUIZZES.map((q) => ({ ...q, noOfQuestions: q.questions.length }))
  );
  const id = (name) => quizzes.find((q) => q.quizName === name)._id;

  console.log("Building users…");
  const usersData = [
    buildUser({
      username: "demo",
      email: "demo@quizmaster.test",
      classname: "Class 10",
      bio: "Primary demo account with rich history for testing the dashboard.",
      bookmarks: [id("Laws of Motion"), id("Programming Basics")],
      attempts: [
        { quizId: id("Programming Basics"), score: 75, day: 0 },
        { quizId: id("English Tenses"), score: 67, day: 1 },
        { quizId: id("Algebra Basics"), score: 100, day: 2 },
        { quizId: id("States of Matter"), score: 67, day: 4 },
        { quizId: id("The Human Body"), score: 100, day: 6 },
        { quizId: id("Laws of Motion"), score: 50, day: 8 },
        { quizId: id("World Facts"), score: 100, day: 10 },
        { quizId: id("Fractions Made Easy"), score: 67, day: 12 },
      ],
    }),
    buildUser({
      username: "aarav",
      email: "aarav@quizmaster.test",
      classname: "Class 10",
      bookmarks: [id("Programming Basics")],
      attempts: [
        { quizId: id("Programming Basics"), score: 100, day: 1 },
        { quizId: id("Algebra Basics"), score: 100, day: 3 },
        { quizId: id("English Tenses"), score: 100, day: 5 },
      ],
    }),
    buildUser({
      username: "diya",
      email: "diya@quizmaster.test",
      classname: "Class 10",
      attempts: [
        { quizId: id("Programming Basics"), score: 75, day: 2 },
        { quizId: id("Algebra Basics"), score: 75, day: 4 },
      ],
    }),
    buildUser({
      username: "kabir",
      email: "kabir@quizmaster.test",
      classname: "Class 10",
      attempts: [
        { quizId: id("World Facts"), score: 67, day: 3 },
        { quizId: id("The Human Body"), score: 50, day: 7 },
      ],
    }),
    buildUser({
      username: "meera",
      email: "meera@quizmaster.test",
      classname: "Class 12 (Science)",
      attempts: [
        { quizId: id("Quantum Mechanics Intro"), score: 100, day: 1 },
        { quizId: id("Laws of Motion"), score: 75, day: 2 },
      ],
    }),
    buildUser({
      username: "rohan",
      email: "rohan@quizmaster.test",
      classname: "Class 8",
      attempts: [
        { quizId: id("Algebra Basics"), score: 50, day: 2 },
        { quizId: id("English Tenses"), score: 67, day: 5 },
      ],
    }),
    // Fresh account: no history, to test empty states.
    buildUser({
      username: "newbie",
      email: "newbie@quizmaster.test",
      classname: "Class 9",
      bio: "Brand-new account — use to test empty dashboard/profile states.",
      attempts: [],
    }),
  ];

  // Use create() (not insertMany) so the pre-save hook hashes each password.
  for (const u of usersData) {
    await User.create(u);
    console.log(`  + ${u.username}`);
  }

  console.log(`\nDone. ${quizzes.length} quizzes, ${usersData.length} users.`);
  console.log(`All accounts use password: ${PASSWORD}`);
  await mongoose.connection.close();
  process.exit(0);
}

seed().catch(async (err) => {
  console.error("Seed failed:", err);
  await mongoose.connection.close();
  process.exit(1);
});

import mongoose from 'mongoose';

// Define the Quiz Schema
const quizSchema = new mongoose.Schema({
  quizName: {
    type: String,
    required: true,
    trim: true
  },
  class: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  topic: {
    type: String,
    required: true,
    trim: true
  },
  format: {
    type: String,
    enum: ['MCQ-Single', 'MCQ-Multiple', 'True/False', 'Fill-in-the-Blank'], // Quiz formats
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  noOfQuestions: {
    type: Number,
    required: true,
    min: [1, 'Quiz must have at least one question']
  },
  totalTime: {
    type: Number,
    required: true,
    min: [5, 'Total time must be at least 5 minutes'] // Minimum time for the quiz
  },
  questions: [{
    questionText: {
      type: String,
      required: true
    },
    // Common fields for all formats
    options: [{
      type: String, // For MCQ questions
      required: function() {
        return this.quizFormat === 'MCQ-Single' || this.quizFormat === 'MCQ-Multiple';
      }
    }],

    correctOption: {
      type: [Number], // For MCQ (single or multiple correct answers)
      required: function() { 
        return this.quizFormat === 'MCQ-Single' || this.quizFormat === 'MCQ-Multiple'; 
      },
      validate: {
        validator: function(value) {
          return value.every(option => option < this.options.length);
        },
        message: 'Correct options indices are out of bounds'
      }
    },
    isCorrect: {
      type: Boolean, // For True/False questions
      required: function() { return this.quizFormat === 'True/False'; }
    },
    correctAnswer: {
      type: String, // For Fill-in-the-Blank questions
      required: function() { return this.quizFormat === 'Fill-in-the-Blank'; }
    }
  }]
}, { timestamps: true }); // Add timestamps (createdAt, updatedAt)

quizSchema.statics.fetchAllQuizzes = async function () {
    try {
      return await this.find(); // Fetch all documents
    } catch (error) {
        console.log("error comes from the model function");
      throw error;
    }
  };

// Create and export the Quiz model
const Quiz = mongoose.model('Quiz', quizSchema);

export {Quiz};

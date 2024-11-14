const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ID вопроса
    answer: { type: String, required: true }
});

const QuizAnswer = mongoose.model('QuizAnswer', AnswerSchema);
module.exports = QuizAnswer;

import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({

    question: { type: String, required: true },
    answerOptions: { type: [String], required: true }, // Массив строк для возможных ответов
    timeSeconds: { type: Number, required: false } // Время на ответ в секундах
});

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Заголовок квиза
    questions: { type: [QuestionSchema], required: true } // Массив вопросов
});

const Quiz = mongoose.model('Quiz', QuizSchema);
export  default  Quiz;

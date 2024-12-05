import express from "express";
import {
    createQuiz,
    checkQuizAnswer,
    getQuizById,
    getQuizFormData,
    saveQuiz,
    getQuizListByUser,
    deleteQuiz, QuizPass, QuizPass1, getQuizResults
} from "../controllers/QuizController.js";
import checkAuth from "../utils/checkAuth.js";

const router = express.Router();

router.post("/quiz/create",checkAuth, createQuiz);
router.post("/quiz/:quizId/save1",checkAuth, QuizPass1);
router.post("/quiz/:quizId/pass",checkAuth, QuizPass);
router.delete("/quiz/:quizId/delete",checkAuth, deleteQuiz);
router.post("/quiz/check", checkQuizAnswer);
router.get("/user/:userId/quiz/all", getQuizListByUser);
router.get("/quiz/:quizId/form", getQuizFormData);
router.get("/quiz/:quizId", getQuizById);
router.get("/quiz/:quizId/results", getQuizResults);


export default router;


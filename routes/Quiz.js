import express from "express";
import {createQuiz,checkQuizAnswer,getQuizById} from "../controllers/QuizController.js";

const router = express.Router();

router.post("/quiz/create", createQuiz);
router.get("/quiz/:quizeId/question/:questionId", checkQuizAnswer);
router.get("/quiz/:quizeId", getQuizById);


export default router;

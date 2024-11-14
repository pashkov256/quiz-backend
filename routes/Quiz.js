import express from "express";
import checkAuth from "../utils/checkAuth.js";
import { loginValidation, registerValidation } from "../validations.js";
import {createQuiz} from "../controllers/QuizController.js";
const router = express.Router();

router.post("/quiz/create", createQuiz);


export default router;

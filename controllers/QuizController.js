import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import QuizModel from "../models/Quiz.js";

export const createQuiz = async (req, res) => {
    try {


        console.log(req.body)
         const doc = new QuizModel({
             title:req.body.title,
             questions:req.body.questions
         });

         const user = await doc.save();



         const { passwordHash, ...userData } = user._doc;
        //
        // res.json({ ...userData, token });
        res.status(200).json(user._doc)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Не удалось зарегестрироваться" });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден",
            });
        }

        const isValidPass = await bcrypt.compare(
            req.body.password,
            user._doc.passwordHash
        );
        if (!isValidPass) {
            return res.status(400).json({
                message: "Неверный логин или пароль",
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            "sercetkeyy",
            {
                expiresIn: "30d",
            }
        );
        const { passwordHash, ...userData } = user._doc;
        res.json({ ...userData, token });
    } catch (error) {
        res.json({ message: "Не удалось авторизоваться" });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId, "-passwordHash");

        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден",
            });
        }

        const { ...userData } = user._doc;

        res.json({ ...userData });
    } catch (error) {
        res.status(500).json({ message: "Нет доступа" });
    }
};

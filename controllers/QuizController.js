import fs from "node:fs";
import path from "node:path";
import {v4 as uuidv4} from 'uuid';

export const createQuiz = async (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(path.resolve('db', 'testdb.json'), 'UTF-8'))
        const newQuizId = uuidv4()

        let answers = req.body.answers
        console.log(answers);
        db.users.forEach((user, I) => {
            if (user._id === req.userId) {
                db.users[i].quizes = [...db.users[i].quizes, newQuizId];
            }
        })

        db.quizes.push({
            _id: newQuizId,
            title: req.body.title,
            questions: req.body.questions,
            tags: req.body.tags,
        });

        answers.quizeId = newQuizId
        db.answersQuizes = [db.answersQuizes, answers];


        fs.writeFileSync(path.resolve('db', 'testdb.json'), JSON.stringify(db, null, 2), "UTF-8");
        res.status(200).json({quizId: newQuizId});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Не удалось создать квиз"});
    }
};
export const checkQuizAnswer = async (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(path.resolve('db', 'testdb.json'), 'UTF-8'))
        const userAnswer = req.body.userAnswer
        const {quizeId, questionId} = req.params

        const quiz = db.answersQuizes.find((el) => el.quizeId == quizeId)
        const answer = quiz.answers.find((el) => el.questionId == questionId)


        console.log(answer)
        return res.status(200).json({userAnswer: answer.answer === userAnswer, answer: answer.answer});


    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Не удалось проверить ответ"});
    }
};
export const getQuizById = async (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(path.resolve('db', 'testdb.json'), 'UTF-8'))
        const {quizeId} = req.params

        const quiz = db.quizes.find((el) => el._id == quizeId)
        if (quiz) {
            return res.status(200).json(quiz);
        } else {
            return res.status(404).json({message: "Не удалось найти квиз"});
        }


    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Не удалось проверить ответ"});
    }
};

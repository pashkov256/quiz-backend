import fs from "node:fs";
import path from "node:path";
import {v4 as uuidv4} from 'uuid';
import getCurrentDate from "../utils/getCurrentDate.js";

export const createQuiz = async (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(path.resolve('db', 'testdb.json'), 'UTF-8'))
        const newQuizId = uuidv4()

        let answers = req.body.answers
        db.users.forEach((user, i) => {
            if (user._id === req.userId) {
                db.users[i].userQuizes = [...db.users[i].userQuizes, newQuizId];
            }
        })
        db.quizes.push({
            _id: newQuizId,
            title: req.body.title,
            questions: req.body.questions,
         //   tags: req.body.tags,
            createdAt:getCurrentDate(),
            createdBy: req.userId,
            availableUntil: req.body?.availableUntil || '',peoplePassed: 0
        });

        answers.quizId = newQuizId
        db.answersQuizes = [...db.answersQuizes, {answers,quizId:newQuizId}];

        db.quizResults.push({
            quizId:newQuizId,quizResults:[]
        });


        fs.writeFileSync(path.resolve('db', 'testdb.json'), JSON.stringify(db, null, 2), "UTF-8");
        res.status(200).json({quizId: newQuizId});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Не удалось создать квиз"});
    }
};export const saveQuiz = async (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(path.resolve('db', 'testdb.json'), 'UTF-8'))
        let quiz = req.body.quiz
        let answers = req.body.answers
        let quizId = req.params.quizId
        db.quizes.forEach((quizEl,i) => {
            if(quizEl._id === quizId) {
                db.quizes[i].availableUntil = req.body?.availableUntil || ""
                db.quizes[i].questions = req.body.questions;
            }
        })

        db.answersQuizes.forEach((answer,i) => {
            if(answer.quizId === quizId) {
                console.log("IDDD")
                db.answersQuizes[i] = {
                    answers:answers,
                    quizId:quizId,
                };
            }
        })
        fs.writeFileSync(path.resolve('db', 'testdb.json'), JSON.stringify(db, null, 2), "UTF-8");
        res.status(200).json({quiz,answers});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Не удалось создать квиз"});
    }
};export const QuizPass1 = async (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(path.resolve('db', 'testdb.json'), 'UTF-8'))
        let quizId = req.params.quizId
        let userId = req.userId
        let userName = req.body.userName
        let countAll = req.body.countAll
        let countUser = req.body.countUser

        db.quizes.forEach((quiz,i) => {
            if(quiz._id === quizId) {
                db.quizes[i].peoplePassed = db.quizes[i].peoplePassed + 1;
            }
        })


        let repeat = 0
        db.quizResults.forEach((se,index)=>{

            if(se.quizId === quizId && repeat !== 1) {
                console.log(`se.quizId === quizId ${se.quizId === quizId}`)
                console.log(`se.quizId ${se.quizId}`)
                console.log(`quizId ${quizId}`)
                repeat += 1
                db.quizResults[index].quizResults = [...db.quizResults[index].quizResults,{
                    userId,
                    userName,
                    countAll,
                    countUser
                }]
            }
        })



        fs.writeFileSync(path.resolve('db', 'testdb.json'), JSON.stringify(db, null, 2), "UTF-8");
        res.status(200)
    } catch (error) {
        console.log(error);
        res.status(444).json({message: "Не удалось создать квиз"});
    }
};
export const QuizPass = async (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(path.resolve('db', 'testdb.json'), 'UTF-8'))
        let quizId = req.params.quizId
        let userId = req.userId
        let userName = req.body.userName
        let countAll = req.body.countAll
        let countUser = req.body.countUser

        db.quizes.forEach((quiz,i) => {
            if(quiz._id === quizId) {
                db.quizes[i].peoplePassed = db.quizes[i].peoplePassed + 1;
            }
        })


        let repeat = 0
        db.quizResults.forEach((se,index)=>{

            if(se.quizId === quizId && repeat !== 1) {
                console.log(`se.quizId === quizId ${se.quizId === quizId}`)
                console.log(`se.quizId ${se.quizId}`)
                console.log(`quizId ${quizId}`)
                repeat += 1
                db.quizResults[index].quizResults = [...db.quizResults[index].quizResults,{
                    userId,
                    userName,
                    countAll,
                    countUser
                }]
            }
        })



        fs.writeFileSync(path.resolve('db', 'testdb.json'), JSON.stringify(db, null, 2), "UTF-8");
        res.status(200)
    } catch (error) {
        console.log(error);
        res.status(444).json({message: "Не удалось создать квиз"});
    }
};

export const deleteQuiz = async (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(path.resolve('db', 'testdb.json'), 'UTF-8'))
        let quizId = req.params.quizId
        let userId = req.userId

        const clearQuizes = db.quizes.map((quiz,i) => {
            if(quiz.quizId !== quizId){
                return quiz
            }
        })

        const clearUsers = db.users.map((el) => {
            if(el._id == userId){
                const userQuizes = el.userQuizes.filter((el)=> el !== quizId)
                return {
                    ...el,userQuizes
                }
            }else {
                return el
            }
        });

        db.quizes = clearQuizes
        db.users = clearUsers

        fs.writeFileSync(path.resolve('db', 'testdb.json'), JSON.stringify(db, null, 2), "UTF-8");
        res.status(200).json();
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Не удалось создать квиз"});
    }
};
export const checkQuizAnswer = async (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(path.resolve('db', 'testdb.json'), 'UTF-8'))
        const {userAnswer,quizId, questionId} = req.body
        console.log(req.body)
        const quiz = db.answersQuizes.find((el) => el.quizId === quizId)
        console.log("quiz")
        console.log(quiz)
        const answer = quiz.answers.find((el) => el.questionId == questionId)


        console.log(answer)
        return res.status(200).json({isCorrect: answer.answer === userAnswer, correctAnswer: answer.answer});


    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Не удалось проверить ответ"});
    }
};
export const getQuizListByUser = async (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(path.resolve('db', 'testdb.json'), 'UTF-8'))
        const {userId} = req.params
        const userQuizesId = db.users.find((el) => el._id == userId).userQuizes;
        const quizes = db.quizes.filter((el) => userQuizesId.includes(el._id))
        res.status(200).json({quizes})

    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Ошибка при поиске квиза"});
    }
};
export const getQuizFormData = async (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(path.resolve('db', 'testdb.json'), 'UTF-8'))
        const {quizId} = req.params

        const quiz = db.quizes.find((el) => el._id == quizId)
        const answers = db.answersQuizes.find((answers) => answers.quizId === quizId)



        if (quiz) {
            return res.status(200).json({quiz,...answers});
        } else {
            return res.status(404).json({message: "Не удалось найти квиз"});
        }


    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Не удалось проверить ответ"});
    }
};

export const getQuizById = async (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(path.resolve('db', 'testdb.json'), 'UTF-8'))
        const {quizId} = req.params

        const quiz = db.quizes.find((el) => el._id == quizId)
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
export const getQuizResults = async (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(path.resolve('db', 'testdb.json'), 'UTF-8'))
        const {quizId} = req.params

        const quizResults = db.quizResults.find((el) => el.quizId == quizId)
        if (quizResults) {
            return res.status(200).json(quizResults);
        } else {
            return res.status(404).json({message: "Не удалось найти квиз историю"});
        }


    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Не удалось проверить ответ"});
    }
};

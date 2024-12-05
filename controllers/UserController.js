import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as fs from "node:fs";
import * as path from "node:path";
import {v4 as uuidv4} from 'uuid';

export const register = async (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(path.resolve('db', 'testdb.json'), 'UTF-8'))
        const haveUserWithReqEmail = db.users.some((user) => user.email === req.body.email)
        if (haveUserWithReqEmail) {
            res.status(409).json({message: 'Пользователь с такой почтой уже существует'});
        } else {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);
            const newUserId = uuidv4()
            const newUser = {
                _id: newUserId,
                passwordHash: hash,
                email: req.body.email,
                fullName: req.body.fullName,
                userQuizes: []
            }
            console.log(newUser)
            db.users.push(newUser)
            const token = jwt.sign(
                {
                    _id: newUserId,
                },
                "sercetkeyy",
                {
                    expiresIn: "30d",
                }
            );

            fs.writeFileSync(path.resolve('db', 'testdb.json'), JSON.stringify(db, null, 2), "UTF-8");
            res.status(200).json({...newUser, token});

        }

    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Не удалось зарегестрироваться"});
    }
};

export const login = async (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(path.resolve('db', 'testdb.json'), 'UTF-8'))

        const user = db.users.find((user) => user.email === req.body.email)
        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден",
            });
        }
        const {passwordHash, ...userWithoutPassword} = user
        const isValidPass = await bcrypt.compare(
            req.body.password,
            passwordHash
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
        res.json({...userWithoutPassword, token});
    } catch (error) {
        console.log(error)
        res.json({message: "Не удалось авторизоваться"});
    }
};

export const getMe = async (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(path.resolve('db', 'testdb.json'), 'UTF-8'))
        const user = db.users.find((user) => user._id === req.userId)

        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден",
            });
        }

        const {passwordHash, ...userWithoutPassword} = user
        console.log({passwordHash, ...userWithoutPassword})
        res.json({...userWithoutPassword});
    } catch (error) {
        res.status(500).json({message: "Нет доступа"});
    }
};

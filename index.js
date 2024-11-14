import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import UserRoute from "./routes/User.js";
import QuizRoute from './routes/Quiz.js'
const app = express();

dotenv.config();
mongoose
    .connect(process.env.mongoConnectUrl)
    .then(() => {
        console.log("MONGODB WORKING");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(cors());
app.use(express.json());

app.use(UserRoute);
app.use(QuizRoute);
app.use("/uploads", express.static("uploads"));





 app.listen(3333, () => {
    console.log("server working on 3333 PORT");
});

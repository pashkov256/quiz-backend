import cors from "cors";
import express from "express";
import UserRoute from "./routes/User.js";
import QuizRoute from './routes/Quiz.js'


const app = express();




app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(QuizRoute);

app.listen(3333, () => {
    console.log("server working on 3333 PORT");
});

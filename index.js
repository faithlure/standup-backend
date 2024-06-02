import express from "express"
import cors from "cors"
import UserRoute from "./routes/UserRoute.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({credentials: true}));
app.use(express.json());
app.use(UserRoute);

app.listen(5000, ()=> console.log('Server up and running...'));
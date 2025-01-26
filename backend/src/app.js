import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from './routes/user.routes.js'

const app = express()

app.use(cors({
    origin: 'https://quiz-master-frontend-finaldeploy.onrender.com', // Frontend URL
    credentials: true, // Allow credentials (cookies)
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api", userRouter);

export default app;

import express from "express" // Import avec les ESModule
import dotenv from "dotenv"
import connectDB from "./config/database.js";
import articleRouter from "./routes/articleRouter.js";
import cors from "cors";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
// const express = require("express") // Import avec les commonjs

const app = express();
// Pour récupérer le req.body // POST
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"))
app.use(cors({
    origin: "http://127.0.0.1:5173",
    credentials: true
}))
dotenv.config();

connectDB();


app.use(articleRouter)
app.use(productRouter)
app.use(userRouter)

app.listen(process.env.PORT || 9000, () => {

    console.log(`Le serveur est exécuté à : ${process.env.BASE_URL}`)
})
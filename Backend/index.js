import express from "express"
import Connectdb from "./config/db.js";
import UserRoute from "./routes/UserRoute.js";
import dotenv from "dotenv";

dotenv.config();
const app=express();
app.use(express.json())
app.use("/user",UserRoute);

Connectdb();
app.listen(3000)
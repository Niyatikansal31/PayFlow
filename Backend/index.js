import express from "express"
import Connectdb from "./config/db.js";
import UserRoute from "./routes/UserRoute.js";
import WalletRoute from "./routes/WalletRoute.js";
import dotenv from "dotenv";

dotenv.config();
const app=express();
app.use(express.json())
app.use("/user",UserRoute);
app.use("/wallet",WalletRoute);

Connectdb();
app.listen(3000)
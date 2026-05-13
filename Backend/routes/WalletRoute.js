import express from "express"
import GetBalance from "../controllers/GetBalance.js";
import LoggedIn from "../middleware/LoggedIn.js";

const router=express.Router();

router.get('/balance',LoggedIn,GetBalance)

const WalletRoute=router
export default WalletRoute
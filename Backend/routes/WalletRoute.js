import express from "express"
import GetBalance from "../controllers/GetBalance.js";
import LoggedIn from "../middleware/LoggedIn.js";
import filter from "../controllers/filter.js";

const router=express.Router();

router.get('/balance',LoggedIn,GetBalance)
router.get('/',LoggedIn,filter)

const WalletRoute=router
export default WalletRoute
import express from "express"
import GetBalance from "../controllers/GetBalance.js";
import LoggedIn from "../middleware/LoggedIn.js";
import filter from "../controllers/filter.js";
import transferMoney from "../controllers/transfer.js";
import ValidTransaction from "../middleware/ValidTransaction.js";
import getTransaction from "../controllers/getTransactions.js";
const router=express.Router();

router.get('/balance',LoggedIn,GetBalance)
router.post('/transfer',LoggedIn,ValidTransaction,transferMoney)
router.get('/history',LoggedIn,getTransaction)

const WalletRoute=router
export default WalletRoute
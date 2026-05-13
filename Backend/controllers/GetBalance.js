import User from "../models/User.js";
import Wallet from "../models/Wallet.js";
import STATUS_CODES from "../utils/StatusCodes.js";
import jwt from "jsonwebtoken"

const GetBalance=async (req,res)=>{
    try{
        const userId=req.user.id;
        const user=await Wallet.findOne({userId: userId})
        res.status(STATUS_CODES.OK).json({
            success: true,
            "balance": user.balance
        })
    }catch(err){
        console.log(err)
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            msg: "Error fetching balance!"
        })
        return;
    }
}
export default GetBalance
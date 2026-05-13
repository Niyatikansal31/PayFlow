import User from "../models/User.js";
import Wallet from "../models/Wallet.js";
import STATUS_CODES from "../utils/StatusCodes.js";
import jwt from "jsonwebtoken"

const GetBalance=async (req,res)=>{
    try{
        const authtoken=req.headers.authorization;
        const token=authtoken.split(" ")[1];

        const response=await jwt.verify(token,process.env.JWT_SECRET_KEY);
        const userId=response.id;
        const user=await Wallet.findOne({userId: userId})
        res.status(STATUS_CODES.OK).json({
            success: true,
            "balance": user.balance
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            msg: "Error fetching balance!"
        })
        return;
    }
}
export default GetBalance
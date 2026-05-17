import STATUS_CODES from "../utils/StatusCodes.js";
import Wallet from "../models/Wallet.js";

const ValidTransaction=async(req,res,next)=>{
    try{
        const senderId=req.user.id;
        const recieverId=req.body.to;
        const amount=req.body.amount;

        if(!senderId || !recieverId || !amount){
            res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                msg: "Please Enter all details correctly!"
            })
            return;
        }
        const reciever=await Wallet.findOne({userId: recieverId})
        const sender=await Wallet.findOne({userId: senderId})

        if(!reciever){
            res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                msg: "User does not exist!"
            })
            return;
        }
        if(recieverId==senderId){
            res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                msg: "Sender and reciever id should be different!"
            })
            return;
        }
        if(sender.balance<amount || amount<0){
            res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                msg: "Please Enter a valid amount!"
            })
            return;
        }
        next();
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            msg: "Cannot complete transaction!"
        })
        return;
    }
}

export default ValidTransaction;
import transaction from "../models/transactionHistories.js";
import STATUS_CODES from "../utils/StatusCodes.js";

const getTransaction=async(req,res)=>{
    try{
        const userid=req.user.id;

        const response = await transaction.find({ $or: [{ senderId: userid }, { receiverId: userid }] }).select('senderId recieverId amount status createdAt');
        if(!response){
            res.status(STATUS_CODES).json({
                success: false,
                msg: "Please try again!"
            })
            return;
        }
        res.status(STATUS_CODES.OK).json({
            success: true,
            history: response
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            msg: "Refresh and try Again!"
        })
    }
}

export default getTransaction
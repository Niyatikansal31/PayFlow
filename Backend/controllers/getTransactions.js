import transaction from "../models/transactionHistories.js";
import STATUS_CODES from "../utils/StatusCodes.js";

const getTransaction=async(req,res)=>{
    const userid=req.user.id;

    const response=await transaction.find({senderId: userid}).select('senderId recieverId amount status createdAt');
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
}

export default getTransaction
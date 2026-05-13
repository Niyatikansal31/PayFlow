import STATUS_CODES from "../utils/StatusCodes.js";
import User from "../models/User.js";
const Checker=async (req,res,next)=>{
    const {email,password} =req.body;
    if(!email || !password){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            msg: "Please Enter valid details!"
        })
        return;
    }

    try{
        const response=await User.findOne({email: email})
        
        if(!response){
            res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                msg: "User does not Exist!"
            })
        }
        next();
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            msg: "Error Logging in!"
        })
        return;
    }
}

export default Checker
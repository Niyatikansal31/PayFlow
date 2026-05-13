import STATUS_CODES from "../utils/StatusCodes.js"
import User from "../models/User.js"

const AlreadyExists=async(req,res,next)=>{
    try{
        const email = req.body.email;
        const response=await User.findOne({email: email})

        if(response){
            res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                msg: "User Already Exists!"
            })
        }
        next();
    }catch(err){
        console.log(err)
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            msg: "Error Occured in Creating a User!"
        })
        return;
    }
}

export default AlreadyExists
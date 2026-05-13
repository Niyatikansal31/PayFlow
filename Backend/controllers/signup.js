import STATUS_CODES from "../utils/StatusCodes.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken"
const signup=async (req,res)=>{
    try{
        const {name,email,password}=req.body;

        if(!email || !password){
            res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                msg: "Please Enter valid details!"
            })
            return;
        }
        const authPassword=jwt.sign(password,process.env.JWT_SECRET_KEY || "1234");
        const newUser=await new User({
            name, 
            email,
            password: authPassword
        })
        newUser.save()
        res.status(STATUS_CODES.CREATED).json({
            success: true,
            msg: "User Created!"
        })
    }catch(err){
        console.log(err)
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            msg: "Error Occured!Please try Again"
        })
        return;
    }
}

export default signup
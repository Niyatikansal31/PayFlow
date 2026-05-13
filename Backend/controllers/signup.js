import STATUS_CODES from "../utils/StatusCodes.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs"
const signup=async (req,res)=>{
    try{
        const {name,email,password}=req.body;

        const authPassword=await bcrypt.hash(password, 10);
        const newUser=new User({
            name, 
            email,
            password: authPassword
        })
        await newUser.save()
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
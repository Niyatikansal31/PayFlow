import jwt from "jsonwebtoken"
import User from "../models/User.js";
import STATUS_CODES from "../utils/StatusCodes.js";
import bcrypt from "bcryptjs";
const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const reqUser=await User.findOne({email: email})
        if (!reqUser) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                success: false,
                msg: "User not found"
            });
        }
        if (!reqUser.password) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                success: false,
                msg: "User password not found in DB"
            });
        }
        const userpassword=await bcrypt.compare(password,reqUser.password);

        if(!userpassword){
            res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                msg: "Incorrect Password!"
            })
            return;
        }
        const jwtToken=await jwt.sign({id: reqUser._id,email: email},process.env.JWT_SECRET_KEY)
        res.status(STATUS_CODES.OK).json({
            success: true,
            token: jwtToken
        })
    }catch(err){
        console.log(err)
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            msg: "Error Logging in!"
        })
        return;
    }
}
export default login
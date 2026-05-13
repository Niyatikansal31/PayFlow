import jwt from "jsonwebtoken"
import STATUS_CODES from "../utils/StatusCodes.js";

const LoggedIn=async (req,res,next)=>{
    try{
        const authtoken=req.headers.authorization;
        const token=authtoken.split(" ")[1];

        const response=await jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!response){
            res.status(STATUS_CODES.NOT_FOUND).json({
                success: false,
                msg: "User not loggedIn!"
            })
            return;
        }
        req.user={id: response.id}
        next();
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            msg: "Error fetching balance!"
        })
        return;
    }
    
}
export default LoggedIn
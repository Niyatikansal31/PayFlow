import User from "../models/User.js";
import STATUS_CODES from "../utils/StatusCodes.js";

const filter=async (req,res)=>{
    try{
        const username=req.query.filter;
        const response=await User.find({ name: { $regex: username, $options: 'i' } }).select('_id name email');
        if(!response){
            res.status(STATUS_CODES.NOT_FOUND).json({
                success: "false",
                msg: "Not Found!"
            })
        }
        res.status(STATUS_CODES.OK).json({
            success: "true",
            users: response
        })
    }catch(err){
        console.log(err);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: "false",
            msg: "Error Occured!"
        })
    }
}
export default filter
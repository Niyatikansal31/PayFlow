import mongoose from "mongoose";

const Connectdb=async()=>{
    try{
        const response=await mongoose.connect(process.env.MONGODB_URI)
        if(!response){
            console.log("Error connecting the server!");
            return;
        }else{
            console.log("Database Connected!");
        }
    }catch(err){
        console.log("Error connecting the server!");
        return;
    }
}

export default Connectdb;
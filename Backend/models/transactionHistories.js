import mongoose from "mongoose";

const TransactionSchema=new mongoose.Schema({
    senderId: {
        type: String,
        required: true
    },
    recieverId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const transaction=mongoose.model("transaction histories",TransactionSchema)
export default transaction
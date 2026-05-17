import mongoose from "mongoose"

const WalletSchema=mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const Wallet=mongoose.model("wallet",WalletSchema)
export default Wallet
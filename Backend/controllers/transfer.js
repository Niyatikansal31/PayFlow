import transaction from "../models/transactionHistories.js";
import wallet from "../models/Wallet.js";
import mongoose from "mongoose";
import STATUS_CODES from "../utils/StatusCodes.js";

const transferMoney=async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const senderId = req.user.id;
        const recieverId = req.body.to;
        const amount = req.body.amount;

        const record = new transaction({
            senderId,
            recieverId,
            amount,
            status: "pending"
        });
        await record.save({ session });
        
        const transactionId = record._id;

        const senderWallet = await wallet.findOne(
            { userId: senderId },
            null,
            { session }
        );

        await wallet.updateOne(
            { userId: senderId },
            { $inc: { balance: -amount } },
            { session }
        );

        await wallet.updateOne(
            { userId: recieverId },
            { $inc: { balance: amount } },
            { session }
        );

        await transaction.updateOne(
            { _id: transactionId },
            { $set: { status: "success" } },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        res.json({
            msg: "Transaction Completed!"
        });

    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.log(err);
        res.status(500).json({
            msg: "Transaction Failed"
        });
    }
}

export default transferMoney;
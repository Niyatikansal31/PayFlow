import express from "express"
import AlreadyExists from "../middleware/AlreadyExists.js"
import signup from "../controllers/signup.js"

const router=express.Router();

router.post('/signup',AlreadyExists,signup)
const UserRoute=router
export default UserRoute
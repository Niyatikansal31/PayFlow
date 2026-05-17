import express from "express"
import AlreadyExists from "../middleware/AlreadyExists.js"
import signup from "../controllers/signup.js"
import Checker from "../middleware/Checker.js";
import login from "../controllers/login.js";
import LoggedIn from "../middleware/LoggedIn.js";
import filter from "../controllers/filter.js";
const router=express.Router();

router.post('/signup',AlreadyExists,signup)
router.post('/login',Checker,login)
router.get('/',LoggedIn,filter)

const UserRoute=router
export default UserRoute
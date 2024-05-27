import { Router } from "express";
import { createUser, getAllUsers, loginUser } from "../controllers/user.js";
import { userLoginValidate, userRegisterValidate } from "../utils/userValidation.js";
import auth from "../utils/auth.js";
const router = Router();

router.post("/register", userRegisterValidate, createUser)
.post('/login', userLoginValidate, loginUser)
.get("/", auth, getAllUsers);

export { router as userRouter };

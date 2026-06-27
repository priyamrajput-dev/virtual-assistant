import express from "express"
import * as authController from "../controllers/auth.controller.js"
const authRouter = express.Router();


authRouter.post("/signup",authController.signUp);
authRouter.post("/signin", authController.signIn);
authRouter.get("/logout",authController.logOut);

export default authRouter;
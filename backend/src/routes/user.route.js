import express from "express"
import * as userController from "../controllers/user.controller.js";
import { isAuth } from '../middlewares/isAuth.middleware.js';
const userRouter = express.Router();

userRouter.get("/current",isAuth,userController.getCurrentUser);

export default userRouter;
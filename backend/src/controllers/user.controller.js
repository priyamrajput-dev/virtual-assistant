import User from "../models/user.model.js"
import * as userService from "../services/user.service.js"
import ApiResponse from '../utils/api.response.js';
export const getCurrentUser = async(req,res)=>{
    try {
        const userId = req.userId
        const {user} = await userService.getCurrentUser(userId);
        ApiResponse.ok(res, "", user);
    } catch (error) {
        next(error);
    }
}
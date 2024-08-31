import userModel from "../../DB/model/user.model.js";
import { AppError } from "../utlis/AppError.js";

export const checkEmail = async(req,res,next)=>{
    const {email} = req.body;
    const user = await userModel.findOne({email});
    if(user){
        //  return res.status(409).json({message:"email already exists !!"});
       
         return next(new AppError(`email already exists !!`,409));
    }
    next();
}
import userModel from "../../../DB/model/user.model.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
export const register = async(req,res)=>{
    const {userName , email , password} = req.body;
    const user = await userModel.findOne({email});
    if(user){
        return res.status(409).json({message:"email already exists !!"});
    }
    const hashPassword = bcrypt.hashSync(password,parseInt(process.env.SALTROUND));

    const createUser = await userModel.create({userName,email,password:hashPassword});
    return res.status(201).json({message:"success" , user:createUser});
}

export const login = async(req,res)=>{
    const {email , password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({message:"invalid data !!"});
    }
    const match = bcrypt.compareSync(password,user.password);
    if(!match){
        return res.status(400).json({message:"invalid data !!"});
    }
    if(user.status == "NotActive"){
        return res.status(400).json({message:"your account is blocked !!"});
    }
    const token = await jwt.sign({id:user._id,role:user.role},process.env.LOGINSIGN);
    return res.status(201).json({message:"success",token});
}
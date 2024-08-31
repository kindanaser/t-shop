import userModel from "../../../DB/model/user.model.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
import {sendEmail} from '../../utlis/sendEmail.js'
import {nanoid , customAlphabet} from 'nanoid'
import xlsx from 'xlsx'

export const register = async(req,res)=>{
    const {userName , email , password } = req.body;
    const hashPassword = bcrypt.hashSync(password,parseInt(process.env.SALTROUND));
    const createUser = await userModel.create({userName,email,password:hashPassword});
    const token = jwt.sign({email},process.env.CONFIRM_EMAILTOKEN)
    await sendEmail(email,`Welcome`,userName,token); 
    return res.status(201).json({message:"success" , user:createUser});
}

export const addUserExcel = async(req,res)=>{
    const workbook = xlsx.readFile(req.file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const users = xlsx.utils.sheet_to_json(worksheet);
    await userModel.insertMany(users);
    return res.json({message:"success"})
}

export const confirmEmail = async(req,res)=>{
   const token = req.params.token;
   const decoded = jwt.verify(token,process.env.CONFIRM_EMAILTOKEN);
   await userModel.findOneAndUpdate({email:decoded.email},{confirmEmail:true});
   return res.status(200).json({message:"success"});
}

export const login = async(req,res)=>{
    const {email , password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({message:"invalid data !!"});
    }
    if(!user.confirmEmail){
        return res.status(400).json({message:"please confirm your email !!"});
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

export const sendCode = async(req,res)=>{
    const {email} = req.body; 

    const code = customAlphabet('1234567890abcdef',4)();

    const user = await userModel.findOneAndUpdate({email},{sendCode:code},{new:true});
    if(!user){
        return res.status(404).json({message:"email not exists !!"})
    }
    await sendEmail(email,`reset password`,`<h2>code is : ${code}</h2>`)
    return res.status(201).json({message:"success"}); 
}

export const forgotPassword = async(req,res)=>{
    const {email,password,code} = req.body; 

    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).json({message:"email not exists !!"})
    }
    if(user.sendCode != code){
        return res.status(404).json({message:"invalid code !!"})
    }
   user.password = await bcrypt.hash(password,parseInt(process.env.SALTROUND));
   user.sendCode = null;
   await user.save();
    return res.status(201).json({message:"success"}); 
}
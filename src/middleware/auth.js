import userModel from '../../DB/model/user.model.js'
import jwt from 'jsonwebtoken';

export const roles = {
    Admin:'Admin',
    User:'User' ,
}
export const auth = (accessRole = []) =>{
    return async (req,res,next)=>{
        const {authorization} = req.headers;
        if(!authorization?.startsWith(process.env.BEARERTOKEN)){
            // return res.status(400).json({message:"invalid token !!"});
            return next(new AppError(`invalid token !!`,401));
        }
        const token = authorization.split(process.env.BEARERTOKEN)[1];
        const decoded = await jwt.verify(token,process.env.LOGINSIGN);
        if(!decoded){
            //  return res.status(400).json({message:"invalid token !!"}); 
              return next(new AppError(`invalid token !!`,401));
        }
        const user = await userModel.findById(decoded.id).select("userName role");
        if(!user){
           return res.status(400).json({message:"user not found"});
        //    return next(new AppError(`user not found !!`,409));
        }

        if(!accessRole.includes(user.role)){
            return res.status(403).json({message:"not auth user !!"});
        }
        req.user = user;
        next();
    }
} 

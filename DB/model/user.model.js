import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema({
     userName:{
        type:String,
        required:true,
        min:[4,'min is 4 characters'],
        max:(20,'max is 40 characters')
     },
     email:{
       type:String,
       unique:true,
       required:true,
     },
     password:{
        type:String,
        required:true,
     },
     image:{
        type:Object,
     },
     phone:{
        type:String,
     },
     address:{
        type:String,
     },
     confirmEmail:{
        type:Boolean,
        default:false,
     },
     gender:{
        type:String,
        enum:['Male','Female']
    },
    status:{
        type:String,
        default:'Active',
        enum:['Active','NotActive']
    },
    role:{
        type:String,
        default:'User',
        enum:['User','Admin']
    },
    sendCode:{
      type:String,
      default:null,
    }
},
{timestamps:true})

const userModel = model('User',userSchema);
export default userModel;
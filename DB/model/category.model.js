import { Schema, Types, model } from 'mongoose';

const categorySchema = new Schema({
     name:{
        type:String,
        required:true,
     },
     slug:{
        type:String,
        required:true,
     },
     image:{
        type:Object,
     },
    status:{
        type:String,
        default:'Active',
        enum:['Active','NotActive']
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
    },
    updatedBy:{
        type:Types.ObjectId,
        ref:'User',
    }
},
{timestamps:true})

const categoryModel = model('Category',categorySchema);
export default categoryModel;
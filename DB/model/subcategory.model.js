import { Schema, Types, model } from 'mongoose';

const subcategorySchema = new Schema({
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
    },
    categoryId:{
        type:Types.ObjectId,
        ref:'Category',
        required:true,
    }
},
{timestamps:true})

const subcategoryModel = model('Subcategory',subcategorySchema);
export default subcategoryModel;
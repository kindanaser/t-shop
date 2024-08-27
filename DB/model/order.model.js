import { Schema, Types, model } from 'mongoose';
const orderSchema = new Schema({
     userId:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
     },
     products:[{
        productName:{type:String},
        productId:{type:Types.ObjectId,ref:'Product',required:true},
        quantity:{type:Number,default:1,required:true},
        finalPrice:{type:Number,required:true,},
     }],
     finalPrice:{
         type:Number,
         required:true,
     },
     address:{
      type:String,
      required:true,
     },
     phoneNumber:{
      type:String,
      required:true
   },
   paymentType:{
      type:String,
      enum:['Cash','Card'],
      default:'Cash',
   },
   couponId:{
      type:Types.ObjectId,
      ref:'Coupon',
    },
   status:{
      type:String,
      enum:['Pending','Cancelled','Confirmed','Onway','Delivered'],
      default:'Pending',
   },
   notes:{
      type:String,
   },
   rejectedReason:{
      type:String,
   },
   updatedBy:{
      type:Types.ObjectId,
        ref:'User',
        required:true,
   }
},

{timestamps:true,})

const orderModel = model('Order',orderSchema);
export default orderModel;
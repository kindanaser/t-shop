import couponModel from '../../../DB/model/coupon.model.js'
import cartModel from '../../../DB/model/cart.model.js'
import productModel from '../../../DB/model/product.model.js';
import userModel from '../../../DB/model/user.model.js';
import orderModel from '../../../DB/model/order.model.js';
import {createInvoice} from "../../utils/pdf.js"; 

// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.stripe_sk);

export const create = async (req,res)=>{
    const {couponName} = req.body;
    const cart = await cartModel.findOne({userId:req.user._id});
    if(!cart || cart.products.length === 0){
        return res.status(400).json({message:"cart is empty!!"})
    }
 
    req.body.products = cart.products; 

    if(couponName){
        const coupon = await couponModel.findById(couponName);
        if(!coupon){
        return res.status(400).json({message:"coupon not found!!"})
        }
        if(coupon.expireDate < new Date()){
            return res.status(400).json({message:"coupon expired!!"})
        }
        if(coupon.userdBy.includes(req.user._id)){
            return res.status(409).json({message:"coupon already used!!"})
        }
        req.body.coupon = coupon;
    }

    let finalProductList = [];
    let subTotal = 0;
    for(let product of req.body.products){
      const checkProduct = await productModel.findOne({
        _id: product.productId,
        stock:{$gte:product.quantity}
      });

      if(!checkProduct){
        return res.status(400).json({message:"product quantity not available !!"});
      }
      product = product.toObject();

      product.name = checkProduct.name;
      product.price = checkProduct.price;
      product.discount = checkProduct.discount;
      product.finalPrice = product.quantity * checkProduct.finalPrice;
      subTotal+=product.finalPrice;

      finalProductList.push(product);
    }
    const user = await userModel.findById(req.user._id);

    if(!req.body.address){
        req.body.address = user.address;
    }
    if(!req.body.phone){
       req.body.phone = user.phoneNumber;
    }
   
  /*  const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data:{
                currency:'USD',
                unit_amount:subTotal - (subTotal * ( (req.body.coupon?.amount || 0)) /100),
                product_data:{
                    name:user.userName
                }
            },
            quantity: 1,
          }],
        mode: 'payment',
        success_url: `http://www.facebook.com`,
        cancel_url: `http://www.youtube.com`,
      });

      return res.json(session)*/

    const order = await orderModel.create({
        userId:req.user._id,
        products:finalProductList,
        finalPrice:subTotal - (subTotal * ( (req.body.coupon?.amount || 0)) /100),
        address:req.body.address,
        phoneNumber:req.body.phone,
        updatedBy:req.user._id
    });

    if(order){
        for(const product of req.body.products){
            await productModel.findOneAndUpdate({_id:product.productId},
                { 
                    $inc:{
                        stock:-product.quantity
                    }
                }
            )
        }

    if(req.body.coupon){
        await couponModel.findByIdAndUpdate({_id:req.body.coupon._id},{
            $addToSet:{
                usedBy:req.user._id
            }
        })
    }
       await cartModel.updateOne({userId:req.user._id},{
         products:[]
    })
 }

 const invoice = {
    shipping: {
      name: user.userName,
      address: order.address,
      phoneNumber: order.phoneNumber,
    },
    items:order.products,
    subtotal: order.finalPrice,
    invoice_nr: order._id
  };
  
  createInvoice(invoice, "invoice.pdf");

    return res.status(201).json({message:"success",order});
 }

export const getOrders = async (req, res)=>{

     const orders = await orderModel.find({
    $or:[
        {
            status:'Pending',
        },
        {
            status:'Confirmed',
        }
    ]
    });
    return res.status(201).json({message:"success",orders});
}

export const getUserOrders = async (req, res)=>{

    const orders = await orderModel.find({userId:req.user._id});

    return res.json({message:'success',orders})
}

export const changeStatus = async (req, res)=>{
    
    const {orderId} = req.params;
    const {status} = req.body;

    const order = await orderModel.findById(orderId);
    if(!order){
        return res.json({message:"order not found!!"});
    }

    order.status = status;
    await order.save();

    return res.json({message:'success'})
}

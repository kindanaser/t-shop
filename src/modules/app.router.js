import 'dotenv/config';
import categoriesRouter from './category/category.router.js'
import subcategoryRouter from './subcategory/subcategory.router.js'
import productsRouter from './product/product.router.js'
import cartRouter from './cart/cart.router.js'
import couponRouter from './coupon/coupon.router.js'
import orderRouter from './order/order.router.js'
import authRouter from './auth/auth.router.js'
import userRouter from './user/user.router.js'
import connectDB from '../../DB/connection.js'
 
const initApp = (app,express)=>{
    app.use(express.json())
    connectDB();
    app.get('/',(req,res)=>{
        return res.status(201).json({message:"success"})
     })
    app.use('/auth',authRouter)
    app.use('/user',userRouter) 
    app.use('/categories',categoriesRouter)
    app.use('/subcategory',subcategoryRouter)
    app.use('/products',productsRouter)
    app.use('/cart',cartRouter)
    app.use('/coupon',couponRouter)
    app.use('/order',orderRouter)
    app.use('*',(req,res)=>{
        return res.status(404).json({message:"page noot found"})
     })
     app.use( (err,req,res,next)=>{
        res.json({message:err.message});
     });
}

export default initApp;  
 
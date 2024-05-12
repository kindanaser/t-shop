import 'dotenv/config';
import categoriesRouter from './category/category.router.js'
import subcategoryRouter from './subcategory/subcategory.router.js'
import productsRouter from './product/product.router.js'
import authRouter from './auth/auth.router.js'
import connectDB from '../../DB/connection.js'

const initApp = (app,express)=>{
    app.use(express.json())
    connectDB();
    app.get('/',(req,res)=>{
        return res.status(201).json({message:"success"})
     })
    app.use('/auth',authRouter)
    app.use('/categories',categoriesRouter)
    app.use('/subcategory',subcategoryRouter)
    app.use('/products',productsRouter)

    app.use('*',(req,res)=>{
        return res.status(404).json({message:"page noot found"})
     })
}

export default initApp;  
 
import categoriesRouter from './category/category.router.js'
import productsRouter from './product/product.router.js'
import connectDB from '../../DB/connection.js'

const initApp = (app,express)=>{
    app.use(express.json())
    connectDB();
    app.get('/',(req,res)=>{
        return res.status(201).json({message:"success"})
     })
    app.use('/categories',categoriesRouter)
    app.use('/products',productsRouter)

    app.use('*',(req,res)=>{
        return res.status(404).json({message:"page noot found"})
     })
}

export default initApp;  
 
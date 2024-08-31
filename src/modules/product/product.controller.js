import slugify from 'slugify';
import categoryModel from '../../../DB/model/category.model.js'
import productModel from '../../../DB/model/product.model.js'
import cloudinary from '../../utlis/cloudinary.js';
import subcategoryModel from '../../../DB/model/subcategory.model.js';
import { pagination } from '../../utlis/pagination.js';
export const getProducts = async (req,res)=>{
   const {skip,limit} = pagination(req.query.page,req.query.limit);
   let queryObj = {...req.query};
   const execQuery = ['page','limit','sort','fields','search'];

   execQuery.map( (ele)=>{
    delete queryObj[ele];
   }); 
    queryObj = JSON.stringify(queryObj);
    queryObj = queryObj.replace(/gt|gte|lt|lte|in|nin|eq/g,match => `$${match}`);
    queryObj = JSON.parse(queryObj);
    const mongoseQuery = productModel.find(queryObj).skip(skip).limit(limit)
    // .populate({
    //     path:'reviews',
    //     select:'comment',
    //     populate:{
    //         path:'userId',
    //         select:'userName -_id'
    //     }, 
    // }); 
    if(req.query.search){
      mongoseQuery.find({
        $or:[
            {name:{$regex:req.query.search}},
            {description:{$regex:req.query.search}}
        ]
    });
    }
    
    const count = await productModel.estimatedDocumentCount();

    if(req.query.fields){
        mongoseQuery.select(req.query.fields);
    }
  

    let products = await mongoseQuery.sort(req.query.sort); 
 
    products = products.map(product =>{
        return {
            ...product.toObject(),
            image:product.image.secure_url,
            subImages:product.subImages.map(img=> img.secure_url)
        }
    })

    return res.status(201).json({message:"success",count,products}) 
 }

export const create = async (req,res)=>{
    const {name,price,discount,categoryId,subCategoryId} = req.body;
    const checkCategory = await categoryModel.findById(categoryId);
    if(!checkCategory){
        return res.status(404).json({message:"category not found !!"})
    }

    const checkSubCategory = await subcategoryModel.findById(subCategoryId);
    if(!checkSubCategory){
        return res.status(404).json({message:"sub category not found !!"})
    }

    req.body.slug = slugify(name);
    req.body.finalPrice = price - ((price * (discount || 0)) / 100 );

    const {secure_url,public_id} = await cloudinary.uploader.upload(req.files.image[0].path,{
        folder:`${process.env.APPNAME}/product/${name}`});
 
    req.body.image = {secure_url,public_id}; 
    req.body.subImages = [];
    if(req.files.subImages){
      for(const file of req.files.subImages){
        const {secure_url,public_id} = await cloudinary.uploader.upload(file.path,{
            folder:`${process.env.APPNAME}/product/${name}/subImages`});
        req.body.subImages.push({secure_url,public_id});
        } 
     }
    //  return res.json(req.body)
    const product = await productModel.create(req.body);
    
        return res.status(201).json({message:"success" , product})
 }
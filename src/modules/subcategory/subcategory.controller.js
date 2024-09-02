import slugify from "slugify";
import subcategoryModel from "../../../DB/model/subcategory.model.js"; 
import categoryModel from "../../../DB/model/category.model.js";
import cloudinary from "../../utlis/cloudinary.js";

 export const create = async (req,res)=>{
    const {categoryId} = req.body; 
    const category = await categoryModel.findById(categoryId)
    if(!category){ 
        return res.status(400).json({message:"category not exists !!"})
    }
    // req.body.categoryId = categoryId;
     req.body.name = req.body.name.toLowerCase();
    if(await subcategoryModel.findOne({name:req.body.name})){
        return res.status(409).json({message:"subcategory already exists !!"})
    } 
     req.body.slug = slugify(req.body.name);
    //  return res.status(409).json(req.file.path)
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
        folder:`${process.env.APPNAME}/subcategories`
    }); 
     req.body.image = {secure_url,public_id};
     req.body.createdBy = req.user._id;
    const subcategory = await subcategoryModel.create(req.body);
    return res.json({message:"success",subcategory});
 }
 
 export const getAll = async (req,res)=>{
    const {id} = req.params;
    const subcategory = await subcategoryModel.find({categoryId:id});
    return res.status(201).json({message:"success" , subcategory})
 }

 export const update = async (req,res)=>{ 
    const subcategory = await subcategoryModel.findById(req.params.id);
    if(!subcategory){
        return res.status(404).json({message:"subcategory not found !!"})
    }
     if(req.body.name){
        subcategory.name = req.body.name.toLowerCase();  
        subcategory.slug = slugify(req.body.name); 
    }  

    if(await subcategoryModel.findOne({name:req.body.name,_id:{$ne:req.params.id}})){
        return res.status(409).json({message:"name already exists !!"});
    }
    if(req.file){
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
            folder:`${process.env.APPNAME}/subcategories`
        });
        await cloudinary.uploader.destroy(subcategory.image.public_id);
        subcategory.image = {secure_url , public_id};
    } 
    subcategory.status = req.body.status;
    subcategory.updatedBy = req.user._id;
    await subcategory.save();
    return res.status(201).json({message:"success",subcategory})
 } 

 export const destroy = async (req,res)=>{
    const subcategory = await subcategoryModel.findByIdAndDelete(req.params.id);
    if(!subcategory){
        return res.status(404).json({message:"subcategory not found !!"})
    }
    await cloudinary.uploader.destroy(subcategory.image.public_id);
    return res.status(201).json({message:"success"})
 }

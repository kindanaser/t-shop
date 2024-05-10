import slugify from "slugify";
import categoryModel from "../../../DB/model/category.model.js";
import cloudinary from "../../utlis/cloudinary.js";

 export const create = async (req,res)=>{
     req.body.name = req.body.name.toLowerCase();
    if(await categoryModel.findOne({name:req.body.name})){
        return res.status(409).json({message:"category already exists !!"})
    }
     req.body.slug = slugify(req.body.name);
    //  return res.status(409).json(req.file.path)
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
        folder:'tShop/categories'
    }); 
     req.body.image = {secure_url,public_id};
     req.body.createdBy = req.user._id;
    const category = await categoryModel.create(req.body);
    return res.json({message:"success",category});
 }
 
 export const getAll = async (req,res)=>{
    const categories = await categoryModel.find({});
    return res.status(201).json({message:"success" , categories})
 }

 export const getActive = async (req,res)=>{
    const categories = await categoryModel.find({status:"Active"}).select("name")
    return res.status(201).json({message:"success" , categories})
 }

 export const getDetails = async (req,res)=>{
    const category = await categoryModel.findById(req.params.id);
    return res.status(201).json({message:"success" , category})
 }

 export const update = async (req,res)=>{ 
    const category = await categoryModel.findById(req.params.id);
    if(!category){
        return res.status(404).json({message:"category not found !!"})
    }
     if(req.body.name){
    category.name = req.body.name.toLowerCase();  
    }
    // category.name = req.body.name.toLowerCase();  
    if(await categoryModel.findOne({name:req.body.name,_id:{$ne:req.params.id}})){
        return res.status(409).json({message:"name already exists !!"});
    }
    category.slug = slugify(req.body.name); 
    if(req.file){
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
            folder:'tShop/categories'
        });
        await cloudinary.uploader.destroy(category.image.public_id);
        category.image = {secure_url , public_id};
    } 
    category.status = req.body.status;
    category.updatedBy = req.user._id;
    await category.save();
    return res.status(201).json({message:"success",category})
 } 

 export const destroy = async (req,res)=>{
    const category = await categoryModel.findByIdAndDelete(req.params.id);
    if(!category){
        return res.status(404).json({message:"category not found !!"})
    }
    await cloudinary.uploader.destroy(category.image.public_id);
    return res.status(201).json({message:"success"})
 }

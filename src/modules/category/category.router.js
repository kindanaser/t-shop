import { Router } from "express";
import * as categoriesController from './category.controller.js'
import {endPoints} from './category.role.js'
import subcategoryRouter from '../subcategory/subcategory.router.js'
import fileUpload, { fileTypes } from "../../utlis/multer.js";
import {auth} from '../../middleware/auth.js'
import { validation } from "../../middleware/validation.js";
import * as schema from "./category.validation.js";
import { asyncHandler } from "../../utlis/catchError.js";
const router = Router();

router.use('/:id/subcategory',subcategoryRouter);
router.post('/',auth(endPoints.create),fileUpload(fileTypes.image).single('image'),validation(schema.createCategorySchema),categoriesController.create);
router.get('/',auth(endPoints.get),categoriesController.getAll);
router.get('/active',auth(endPoints.get),categoriesController.getActive);
router.get('/:id',auth(endPoints.get),validation(schema.getDetailsSchema),categoriesController.getDetails);
router.patch('/:id',asyncHandler(auth(endPoints.create)),fileUpload(fileTypes.image).single('image'),validation(schema.updateCategorySchema),asyncHandler(categoriesController.update));
router.delete('/:id',auth(endPoints.delete),validation(schema.deleteCategorySchema),categoriesController.destroy);
export default router; 
import { Router } from "express";
import * as categoriesController from './category.controller.js'
import {endPoints} from './category.role.js'
import subcategoryRouter from '../subcategory/subcategory.router.js'
import fileUpload, { fileTypes } from "../../utlis/multer.js";
import {auth} from '../../middleware/auth.js'
const router = Router();

router.use('/:id/subcategory',subcategoryRouter);
router.post('/',auth(endPoints.create),fileUpload(fileTypes.image).single('image'),categoriesController.create);
router.get('/',auth(endPoints.get),categoriesController.getAll);
router.get('/active',auth(endPoints.get),categoriesController.getActive);
router.get('/:id',auth(endPoints.get),categoriesController.getDetails);
router.patch('/:id',auth(endPoints.create),categoriesController.update);
router.delete('/:id',auth(endPoints.delete),categoriesController.destroy);
export default router; 
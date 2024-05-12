import { Router } from "express";
import * as subcategoriesController from './subcategory.controller.js'
import fileUpload, { fileTypes } from "../../utlis/multer.js";
import {auth} from '../../middleware/auth.js'
const router = Router({mergeParams:true});

router.post('/',auth(),fileUpload(fileTypes.image).single('image'),subcategoriesController.create);
router.get('/',subcategoriesController.getAll);
router.get('/active',subcategoriesController.getActive);
router.get('/:id',subcategoriesController.getDetails);
router.patch('/:id',auth(),subcategoriesController.update);
router.delete('/:id',auth(),subcategoriesController.destroy);
export default router; 
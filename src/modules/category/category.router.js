import { Router } from "express";
import * as categoriesController from './category.controller.js'
import fileUpload, { fileTypes } from "../../utlis/multer.js";
import {auth} from '../../middleware/auth.js'

const router = Router({caseSensitive:true});

router.post('/',auth(),fileUpload(fileTypes.image).single('image'),categoriesController.create);
router.get('/',categoriesController.getAll);
router.get('/active',categoriesController.getActive);
router.get('/:id',categoriesController.getDetails);
router.patch('/:id',auth(),categoriesController.update);
router.delete('/:id',auth(),categoriesController.destroy);
export default router; 
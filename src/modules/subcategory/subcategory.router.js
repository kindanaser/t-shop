import { Router } from "express";
import * as subcategoriesController from './subcategory.controller.js'
import fileUpload, { fileTypes } from "../../utlis/multer.js";
import {endPoints} from './subcategory.role.js'
import {auth} from '../../middleware/auth.js'
import { asyncHandler } from "../../utlis/catchError.js";
const router = Router({mergeParams:true});

router.post('/',auth(endPoints.create),fileUpload(fileTypes.image).single('image'),asyncHandler(subcategoriesController.create));
router.get('/:id',subcategoriesController.getAll);
router.patch('/:id',auth(endPoints.update),asyncHandler(subcategoriesController.update));
router.delete('/:id',auth(endPoints.delete),asyncHandler(subcategoriesController.destroy));
export default router; 
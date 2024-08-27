import { Router } from "express";
import * as controller from './review.controller.js'
import {endPoints} from './review.role.js'
import fileUpload, { fileTypes } from "../../utlis/multer.js";
import {auth} from '../../middleware/auth.js'
const router = Router({mergeParams:true});


router.post('/',auth(endPoints.create),
fileUpload(fileTypes.image).single('image'),controller.create);

export default router;
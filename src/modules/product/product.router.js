import { Router } from "express";
import * as controller from './product.controller.js'
import {endPoints} from './product.role.js'
import fileUpload, { fileTypes } from "../../utlis/multer.js";
import {auth} from '../../middleware/auth.js'
import reviewRoute from './../review/review.router.js'
const router = Router();

router.use('/:productId/review',reviewRoute);
router.get('/', controller.getProducts);
router.post('/',auth(endPoints.create),fileUpload(fileTypes.image).fields([
    {name:'mainImage', maxCount:1},
    {name:'subImages', maxCount:5},
]),controller.create);

export default router;
import { Router } from "express";
import * as controller from './cart.controller.js'
import {endPoints} from './cart.role.js'
import fileUpload, { fileTypes } from "../../utlis/multer.js";
import {auth} from '../../middleware/auth.js'
import { validation } from "../../middleware/validation.js";
import * as schema from "./cart.validation.js";
const router = Router();

router.get('/',auth(endPoints.create),controller.getAll);
router.post('/',auth(endPoints.create),validation(schema.createCartSchema),controller.create);
router.put('/remove/:productId',auth(endPoints.create),controller.remove);
router.put('/clear',auth(endPoints.create),controller.clear);
router.put('/updateQuantity/:productId',auth(endPoints.create),controller.updateQuantity);
export default router;
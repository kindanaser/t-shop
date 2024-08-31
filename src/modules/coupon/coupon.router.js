import { Router } from "express";
import * as controller from './coupon.controller.js'
import {endPoints} from './coupon.role.js'
import fileUpload, { fileTypes } from "../../utlis/multer.js";
import {auth} from '../../middleware/auth.js'
import { validation } from "../../middleware/validation.js";
import * as schema from "./coupon.validation.js";
const router = Router();

router.get('/', controller.getAll);
router.post('/',auth(endPoints.create),validation(schema.createCouponSchema),controller.create);

export default router;
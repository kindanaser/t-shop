import { Router } from "express";
import * as controller from './order.controller.js'
import {endPoints} from './order.role.js'
import fileUpload, { fileTypes } from "../../utlis/multer.js";
import {auth} from '../../middleware/auth.js'
import { asyncHandler } from "../../utlis/catchError.js";
const router = Router();

router.post('/',auth(endPoints.create),asyncHandler(controller.create));
router.get('/all',auth(endPoints.all),controller.getOrders);
router.get('/userOrders',auth(endPoints.getOrder),controller.getUserOrders);
router.patch('/changeStatus/:orderId',auth(endPoints.changeStatus),controller.changeStatus);

export default router; 
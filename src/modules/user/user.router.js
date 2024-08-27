import { Router } from "express";
import * as controller from './user.controller.js'
import {endPoints} from './user.role.js'
import fileUpload, { fileTypes } from "../../utlis/multer.js";
import {auth} from '../../middleware/auth.js'
const router = Router();

router.get('/',auth(endPoints.getUsers),controller.getUsers);
router.get('/userData',auth(endPoints.userData),controller.getUserData);

export default router;
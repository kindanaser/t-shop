import { Router } from "express";
import * as Controller from './auth.controller.js'
import fileUpload, { fileTypes } from "../../utlis/multer.js";
const router = Router({caseSensitive:true});

router.post('/register',Controller.register);
router.post('/login',Controller.login);
router.patch('/sendcode',Controller.sendCode);
router.patch('/forgotpassword',Controller.forgotPassword);

export default router;
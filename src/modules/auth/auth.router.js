import { Router } from "express";
import * as Controller from './auth.controller.js' 
import fileUpload, { fileTypes } from "../../utlis/multer.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { asyncHandler } from "../../utlis/catchError.js";
import { validation } from "../../middleware/validation.js";
import * as schema from "./auth.validation.js";
const router = Router({caseSensitive:true});

router.post('/register',validation(schema.registerSchema),checkEmail,asyncHandler(Controller.register));
router.post('/excel',fileUpload(fileTypes.excel).single('excel'),asyncHandler(Controller.addUserExcel));
router.post('/login',validation(schema.loginSchema),Controller.login);
router.patch('/sendcode',validation(schema.sendCodeSchema),Controller.sendCode);
router.patch('/forgotpassword',validation(schema.forgotPassSchema),Controller.forgotPassword);
router.get('/confirmEmail/:token',Controller.confirmEmail)
 
export default router;
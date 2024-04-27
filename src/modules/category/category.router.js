import { Router } from "express";
import * as categoriesController from './category.controller.js'
const router = Router({caseSensitive:true});

router.get('/',categoriesController.getAllCategories);

export default router;
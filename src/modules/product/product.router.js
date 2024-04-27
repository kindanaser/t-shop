import { Router } from "express";
import * as productsController from './product.controller.js'
const router = Router({caseSensitive:true});

router.get('/', productsController.getAllProducts)

export default router;
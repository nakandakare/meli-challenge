import { Router } from "express";
import {
  getProducts,
  getProductDetail,
} from "../controller/product.controller";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductDetail);

export default router;

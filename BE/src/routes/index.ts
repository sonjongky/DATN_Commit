import { Router } from "express";
import { login } from "../controllers/user";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
} from "../controllers/products";

const router: Router = Router();

router.get("/login/:username/:password", login);

router.get("/products", getProducts);
router.get("/getProduct/:id", getProductById);
router.post("/addProduct", addProduct);
router.put("/editProduct/:id", updateProduct);

export default router;

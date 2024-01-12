import express from "express";
import { addProduct, getAllProducts, getOneProduct } from "../controllers/productsController.js";
import upload from "../middlewares/multer.js"
import { isAuthorized, isLogged } from "../middlewares/auth.js";

const productRouter = express.Router();

productRouter.get("/products", getAllProducts)

productRouter.get("/products/:id", getOneProduct)

productRouter.post("/products/new", isLogged,isAuthorized(["admin"]),upload.single("image"),addProduct)

export default productRouter
import express from "express";
import {
  createProductItem,
  getProductItemsByWishlist,
  updateProductItem,
  deleteProductItem,
} from "../controllers/productItemController.js";

const router = express.Router();

// POST /api/products
router.post("/", createProductItem);

// GET /api/products/wishlist/:wishlistId
router.get("/wishlist/:wishlistId", getProductItemsByWishlist);

// PUT /api/products/:id
router.put("/:id", updateProductItem);

// DELETE /api/products/:id
router.delete("/:id", deleteProductItem);

export default router;

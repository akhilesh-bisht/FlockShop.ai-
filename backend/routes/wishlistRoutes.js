import express from "express";
import {
  createWishlist,
  getWishlistsByUser,
  getWishlistById,
  updateWishlistTitle,
  addCollaborator,
  removeCollaborator,
  deleteWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

// Create a wishlist
router.post("/", createWishlist);

// Get all wishlists for a user
router.get("/user/:userId", getWishlistsByUser);

// Get a single wishlist by ID
router.get("/:id", getWishlistById);

// Update wishlist title
router.put("/:id", updateWishlistTitle);

// Add a collaborator
router.put("/:id/add-collaborator", addCollaborator);

// Remove a collaborator
router.put("/:id/remove-collaborator", removeCollaborator);

// Delete wishlist
router.delete("/:id", deleteWishlist);

export default router;

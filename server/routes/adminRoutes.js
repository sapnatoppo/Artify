import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { getAllUsers, deleteUser,getAllArtworks,
  deleteArtwork, } from "../controllers/adminController.js";

const router = express.Router();

// Admin: Get all users
router.get("/users", protect, admin, getAllUsers);
// Admin: Delete user by ID
router.delete("/users/:id", protect, admin, deleteUser);


// New artwork routes, Admin: view all and delete any arts
router.get("/artworks", protect, admin, getAllArtworks);
router.delete("/artworks/:id", protect, admin, deleteArtwork);

export default router;

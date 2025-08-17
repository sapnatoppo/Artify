import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMySoldArtworks, getMyArtworkOrders } from "../controllers/artistController.js";

const router = express.Router();

// Artist: Get all sold artworks
router.get("/sold-artworks", protect, getMySoldArtworks);

// Artist: Get all orders for their artworks
router.get("/orders", protect, getMyArtworkOrders);

export default router;

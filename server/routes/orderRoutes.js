import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { getUserOrders, getAllOrders, getArtistSales, getOrderById } from "../controllers/orderController.js";

const router = express.Router();

// Buyer: Get their own orders
router.get("/my-orders", protect, getUserOrders);

// Admin: Get all orders (admin only)
router.get("/all", protect, admin, getAllOrders);

// Artist: View orders of their sold artworks
router.get("/my-sales", protect, getArtistSales);

// Buyer: can get their order by ID
router.get("/:id", protect, getOrderById); 

export default router;

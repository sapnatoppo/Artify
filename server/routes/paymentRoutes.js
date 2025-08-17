// routes/paymentRoutes.js
import express from "express";
import { createOrder, verifyPayment } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//  Create Razorpay order
router.post("/create-order", protect, createOrder);

// Verify payment & mark artwork sold
router.post("/verify", protect, verifyPayment);

export default router;

import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// A simple protected route
router.get("/protected", protect, (req, res) => {
  res.json({
    message: "Access granted to protected route",
    user: req.user, // comes from decoded JWT
  });
});

export default router;

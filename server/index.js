//import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import connectDB from './config/db.js';
import cors from "cors";
import userRoutes from './routes/userRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import testRoute from "./routes/testRoute.js";
import artworkRoutes from "./routes/artworkRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import artistRoutes from "./routes/artistRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
//authRoutes
app.use("/api/auth", authRoutes);
//testRoute
app.use("/api/test", testRoute);
//artworkRoutes
app.use("/api/artworks", artworkRoutes);

/*POST /api/artworks → Upload artwork (JWT required)
GET /api/artworks → See all artworks
GET /api/artworks/filter?category=Portrait&minPrice=100 → Filtered list
 */

//paymentRoutes
app.use("/api/payment", paymentRoutes);

//orderRoutes
app.use("/api/orders", orderRoutes);

//artistRoute: view sold and order placed arts
app.use("/api/artist", artistRoutes);

//admimRoutes: view all and delete any
app.use("/api/admin", adminRoutes);


// Basic test route
app.get("/", (req, res) => {
  res.send("🎨 Artify Backend is Running");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

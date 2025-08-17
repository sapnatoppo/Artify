import express from "express";
import {
  createArtwork,
  getAllArtworks,
  //filterArtworks,
  getArtworkById,
  addReview,
  getTopRatedArtworks,
  getBestSellingArtworks,
  getTopArtists,
  getArtworksByArtist,
  updateBlogForArtwork,
  markArtworkAsSold,
  deleteArtworkByAdmin,
} from "../controllers/artworkController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js"; // <-- Multer upload middleware



const router = express.Router();

// Upload a new artwork with image (requires auth + file)
router.post("/", upload.single("image"), protect, createArtwork);

// Get all artworks
router.get("/", getAllArtworks);

// Get artworks with filter (category, price range)
//router.get("/filter", filterArtworks);

// these routes are added before the dynamic /:id route to avoid conflicts.
//rated and bestselling
router.get("/top-rated", getTopRatedArtworks);
router.get("/best-selling", getBestSellingArtworks);

//topartists
router.get("/top-artists", getTopArtists);

//artby-artists
router.get("/artist/:artistId", getArtworksByArtist);


// Get one artwork by ID
router.get("/:id", getArtworkById); 

// Add review
router.post("/:id/review", protect, addReview);

// Update blog for a specific artwork (only by artist)
router.put("/:id/blog", protect, updateBlogForArtwork);

// Mark artwork as sold
router.put("/:id/sold", protect, markArtworkAsSold);

// Admin: Delete any artwork
router.delete("/admin/:id", protect, admin, deleteArtworkByAdmin);


export default router;



import Artwork from "../models/artworkModel.js";

// @desc    Upload a new artwork
export const createArtwork = async (req, res) => {
  try {
    const { title, description, price, category, blog } = req.body;

    // Multer stores the uploaded file info in req.file
    const imageUrl = req.file?.path;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image is required" });
    }

    const artwork = new Artwork({
      title,
      description,
      imageUrl,
      price,
      category,
      blog, //  added this field
      artist: req.user.id, // from JWT
    });

    const saved = await artwork.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to upload artwork", error });
  }
};

// @desc    Add a review to an artwork
// @route   POST /api/artworks/:id/review
// @access  Private
export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    const alreadyReviewed = artwork.reviews.find(
      (r) => r.user.toString() === req.user.id
    );
    if (alreadyReviewed) {
      return res.status(400).json({ message: "You have already reviewed this artwork" });
    }
     const review = {
      user: req.user.id,
      rating: Number(rating),
      comment,
    };

    artwork.reviews.push(review);
    artwork.totalRatings = artwork.reviews.length;
    artwork.rating =
      artwork.reviews.reduce((acc, r) => acc + r.rating, 0) / artwork.totalRatings;

    await artwork.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add review", error });
  }
};

//3rd
// Get top-rated artworks
export const getTopRatedArtworks = async (req, res) => {
  try {
    const topArtworks = await Artwork.find()
      .sort({ rating: -1 }) // highest rated first
      .limit(10)
      .populate("artist", "name");
    res.status(200).json(topArtworks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch top-rated artworks", error });
  }
};

//4 Get best-selling artworks
export const getBestSellingArtworks = async (req, res) => {
  try {
    const soldArtworks = await Artwork.find({ sold: true })
      .sort({ updatedAt: -1 }) // recently sold first
      .limit(10)
      .populate("artist", "name");
    res.status(200).json(soldArtworks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch best-selling artworks", error });
  }
};

//5th
// Top Artists by Sales or Average Rating
export const getTopArtists = async (req, res) => {
  try {
    // Aggregate artworks to group by artist
    const artists = await Artwork.aggregate([
      {
        $group: {
          _id: "$artist",
          totalArtworks: { $sum: 1 },
          totalSold: { $sum: { $cond: ["$sold", 1, 0] } },
          averageRating: { $avg: "$rating" },
        },
      },
      {
        $sort: { totalSold: -1, averageRating: -1 },
      },
      { $limit: 5 },
    ]);

    // Populate artist details
    const populated = await User.populate(artists, {
      path: "_id",
      select: "name email",
    });

    res.status(200).json(populated);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch top artists", error });
  }
};

//6th
// @desc    Get artworks by a specific artist
// @route   GET /api/artworks/artist/:artistId
// @access  Public
export const getArtworksByArtist = async (req, res) => {
  try {
    const artistId = req.params.artistId;

    const artworks = await Artwork.find({ artist: artistId }).populate("artist", "name email");

    res.status(200).json(artworks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch artworks by artist", error });
  }
};

//7th
// @desc    Update blog for an artwork
// @route   PUT /api/artworks/:id/blog
// @access  Private (Only artist who owns it)
export const updateBlogForArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);

    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    // Only allow the original artist to update the blog
    if (artwork.artist.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update blog" });
    }

    artwork.blog = req.body.blog || artwork.blog;

    const updated = await artwork.save();
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update blog", error });
  }
};

//8th
// @desc    Mark artwork as sold
// @route   PUT /api/artworks/:id/sold
// @access  Private (Artist or Admin, later via payment success)
export const markArtworkAsSold = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);

    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    artwork.sold = true;
    artwork.soldAt = new Date();

    const updatedArtwork = await artwork.save();
    res.status(200).json(updatedArtwork);
  } catch (error) {
    res.status(500).json({ message: "Failed to mark artwork as sold", error });
  }
};

//9 // Admin: Delete any artwork
export const deleteArtworkByAdmin = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);

    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    await artwork.deleteOne();
    res.status(200).json({ message: "Artwork deleted by admin successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete artwork", err });
  }
};

//getall art
export const getAllArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find();
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get artworkbyid
export const getArtworkById = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);

    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    res.json(artwork);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


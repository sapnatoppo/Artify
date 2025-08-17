import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    imageUrl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: String,
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // linked to the artist user
      required: true,
    },
     blog: {
      type: String, // This is the blog or story behind the artwork
      default: "",
    },
    sold: {
      type: Boolean,
      default: false,
    },
     reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: String,
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Artwork = mongoose.model("Artwork", artworkSchema);
export default Artwork;

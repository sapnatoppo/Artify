import Artwork from "../models/artworkModel.js";
import Order from "../models/orderModel.js";

//1: Get all sold artworks of the logged-in artist
export const getMySoldArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find({ artist: req.user.id, sold: true });
    res.status(200).json(artworks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sold artworks", err });
  }
};

//2: Get all orders for the logged-in artist's artworks
export const getMyArtworkOrders = async (req, res) => {
  try {
    //  Get all artwork IDs owned by the artist
    const myArtworks = await Artwork.find({ artist: req.user.id });
    const myArtworkIds = myArtworks.map((art) => art._id);

    // Fetch orders placed for those artworks
    const orders = await Order.find({ artwork: { $in: myArtworkIds } })
      .populate("buyer", "name email")
      .populate("artwork", "title");

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch artist orders", err });
  }
};

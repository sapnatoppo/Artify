import User from "../models/userModel.js";

//1 Admin: Get all users 
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", err });
  }
};

//2 Admin: Delete a user by ID 
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    await user.remove();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user", err });
  }
};

//3 Admin: Get all artworks
export const getAllArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find().populate("artist", "name email");
    res.status(200).json(artworks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch artworks", err });
  }
};

//4 Admin: Delete artwork by ID
export const deleteArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);

    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    await artwork.remove();
    res.status(200).json({ message: "Artwork deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete artwork", err });
  }
};


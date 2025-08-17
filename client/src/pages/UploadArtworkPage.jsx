import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UploadArtworkPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [blog, setBlog] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title || !category || !price || !image) {
      setError("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("blog", blog);
    formData.append("image", image);

    try {
      setUploading(true);
      await axios.post("/api/artworks", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUploading(false);
      navigate("/my-artworks");
    } catch (err) {
      setUploading(false);
      setError(err?.response?.data?.message || "Upload failed.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">Upload New Artwork</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Title *"
          className="w-full border p-3 rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category *"
          className="w-full border p-3 rounded-lg"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price in ₹ *"
          className="w-full border p-3 rounded-lg"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          rows={4}
          placeholder="Optional blog/description"
          className="w-full border p-3 rounded-lg"
          value={blog}
          onChange={(e) => setBlog(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          className="w-full border p-3 rounded-lg"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          type="submit"
          disabled={uploading}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          {uploading ? "Uploading..." : "Upload Artwork"}
        </button>
      </form>
    </div>
  );
};

export default UploadArtworkPage;

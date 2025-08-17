import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBlog = () => {
  const { id } = useParams(); // artwork ID from URL
  const navigate = useNavigate();

  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState(false);
  const [artworkTitle, setArtworkTitle] = useState("");

  // Fetch current blog content
  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const { data } = await axios.get(`/api/artworks/${id}`);
        setBlog(data.blog || "");
        setArtworkTitle(data.title);
      } catch (err) {
        console.error("Failed to load artwork blog", err);
        alert("Could not load artwork data.");
      }
    };

    fetchArtwork();
  }, [id]);

  // Submit blog update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      await axios.put(`/api/artworks/${id}/blog`, { blog }, config);
      alert("Blog updated successfully!");
      navigate(`/artwork/${id}`);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Edit Blog for: <span className="text-indigo-600">{artworkTitle}</span></h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <textarea
          rows="10"
          className="w-full p-4 border rounded resize-none"
          placeholder="Write or update your artwork blog/story..."
          value={blog}
          onChange={(e) => setBlog(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;

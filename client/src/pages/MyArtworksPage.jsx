import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const MyArtworksPage = () => {
  const { user } = useAuth();
  const [artworks, setArtworks] = useState([]);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [newBlog, setNewBlog] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchArtworks = async () => {
    try {
      const res = await axios.get(`/api/artworks/artist/${user._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setArtworks(res.data);
    } catch (err) {
      console.error("Error loading artworks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  const handleBlogUpdate = async (artworkId) => {
    try {
      await axios.put(
        `/api/artworks/${artworkId}/blog`,
        { blog: newBlog },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setEditingBlogId(null);
      setNewBlog("");
      fetchArtworks();
    } catch (err) {
      console.error("Failed to update blog", err);
    }
  };

  const handleDelete = async (artworkId) => {
    if (window.confirm("Are you sure you want to delete this artwork?")) {
      try {
        await axios.delete(`/api/artworks/admin/${artworkId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        fetchArtworks();
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">My Uploaded Artworks</h2>
      {loading ? (
        <p>Loading artworks...</p>
      ) : artworks.length === 0 ? (
        <p className="text-gray-600">You haven't uploaded any artworks yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {artworks.map((art) => (
            <div
              key={art._id}
              className="bg-white rounded-xl shadow-md p-4 border relative"
            >
              <img
                src={art.imageUrl}
                alt={art.title}
                className="w-full h-60 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{art.title}</h3>
              <p className="text-gray-600">{art.category}</p>
              <p className="font-medium mt-1 text-indigo-600">₹{art.price}</p>

              {/* Blog View/Edit */}
              {editingBlogId === art._id ? (
                <>
                  <textarea
                    className="w-full mt-3 border p-2 rounded"
                    rows="3"
                    value={newBlog}
                    onChange={(e) => setNewBlog(e.target.value)}
                  />
                  <button
                    onClick={() => handleBlogUpdate(art._id)}
                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Save Blog
                  </button>
                  <button
                    onClick={() => setEditingBlogId(null)}
                    className="ml-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p className="mt-3 text-sm text-gray-700">
                    {art.blog || "No blog/description added."}
                  </p>
                  <button
                    onClick={() => {
                      setEditingBlogId(art._id);
                      setNewBlog(art.blog || "");
                    }}
                    className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                  >
                    Edit Blog
                  </button>
                </>
              )}

              <button
                onClick={() => handleDelete(art._id)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800"
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyArtworksPage;

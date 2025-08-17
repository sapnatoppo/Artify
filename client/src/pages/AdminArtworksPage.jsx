import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminArtworksPage = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch all artworks (Admin)
  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/artworks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArtworks(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching artworks:", err);
      setLoading(false);
    }
  };

  // Delete artwork
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this artwork?")) {
      try {
        await axios.delete(`/api/admin/artworks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArtworks(artworks.filter((a) => a._id !== id));
      } catch (err) {
        console.error("Failed to delete artwork:", err);
      }
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-indigo-800 mb-6">All Artworks (Admin)</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {artworks.map((art) => (
            <div
              key={art._id}
              className="bg-white shadow rounded-xl overflow-hidden border"
            >
              <img
                src={art.imageUrl}
                alt={art.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg text-indigo-700">{art.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  ₹{art.price} | {art.category}
                </p>
                {art.artist && (
                  <p className="text-sm text-gray-500 mt-2">
                    <strong>Artist:</strong> {art.artist.name} ({art.artist.email})
                  </p>
                )}
                <button
                  onClick={() => handleDelete(art._id)}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminArtworksPage;

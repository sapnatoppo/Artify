import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllArtworksPage = () => {
  const [artworks, setArtworks] = useState([]);
  const [category, setCategory] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const { data } = await axios.get("/api/artworks");
        setArtworks(data);
        setFiltered(data);
      } catch (err) {
        console.error("Error fetching artworks", err);
      }
    };
    fetchArtworks();
  }, []);

  const categories = [...new Set(artworks.map((a) => a.category))];

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    if (e.target.value === "") {
      setFiltered(artworks);
    } else {
      setFiltered(artworks.filter((a) => a.category === e.target.value));
    }
  };

  return (
    <div className="px-4 md:px-10 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">All Artworks</h1>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <select
          value={category}
          onChange={handleCategoryChange}
          className="border rounded-md px-3 py-2 text-gray-700"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Artwork Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((art) => (
          <Link
            to={`/artworks/${art._id}`}
            key={art._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all"
          >
            <img
              src={art.imageUrl}
              alt={art.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{art.title}</h3>
              <p className="text-sm text-gray-600 truncate">{art.category}</p>
              <p className="mt-2 text-indigo-600 font-bold">₹{art.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllArtworksPage;

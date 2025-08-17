import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const ArtworkDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const fetchArtwork = async () => {
    try {
      const { data } = await axios.get(`/api/artworks/${id}`);
      setArtwork(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch artwork");
    }
  };

  useEffect(() => {
    fetchArtwork();
  }, [id]);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!rating) return alert("Please select a rating");

    try {
      await axios.post(
        `/api/artworks/${id}/review`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Review submitted");
      setComment("");
      setRating(0);
      fetchArtwork();
    } catch (err) {
      console.error(err);
      alert("Review submission failed");
    }
  };

  const handleBuy = () => {
    navigate(`/checkout/${id}`);
  };

  const isArtist = artwork?.artist?._id === user?._id;
  const isAdmin = user?.isAdmin;

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-6 bg-white shadow-xl rounded-xl">
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="w-full object-cover rounded-xl"
        />

        <div>
          <h2 className="text-3xl font-bold mb-2">{artwork.title}</h2>
          <p className="text-gray-600 mb-2">
            by <span className="text-indigo-600">{artwork.artist?.name}</span>
          </p>
          <p className="mb-3">{artwork.description}</p>
          <p className="text-xl font-semibold mb-2">Price: ₹{artwork.price}</p>
          <p className="mb-4">
            <span className="font-medium">Category:</span> {artwork.category}
          </p>

          <div className="bg-gray-100 p-4 rounded mb-4">
            <h4 className="font-bold mb-1">Artist's Story</h4>
            <p>{artwork.blog || "No blog added for this artwork."}</p>
            {isArtist && (
              <Link
                to={`/artwork/${id}/edit-blog`}
                className="inline-block mt-2 text-sm text-blue-600 hover:underline"
              >
                Edit Blog
              </Link>
            )}
          </div>

          {!artwork.sold ? (
            !isArtist && (
              <button
                onClick={handleBuy}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Buy Now
              </button>
            )
          ) : (
            <span className="text-red-600 font-bold">SOLD</span>
          )}
        </div>
      </div>

      {/* Average Rating */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-2">
          Average Rating: {artwork.rating.toFixed(1)} ⭐ ({artwork.totalRatings})
        </h3>
        <div className="flex text-yellow-500 mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={
                i < Math.round(artwork.rating) ? "text-yellow-500" : "text-gray-300"
              }
            />
          ))}
        </div>
      </div>

      {/* All Reviews */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Reviews</h3>
        {artwork.reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {artwork.reviews.map((rev, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{rev.user.name}</span>
                  <div className="flex text-yellow-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-1">{rev.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Review */}
      {!isArtist && token && (
        <form
          onSubmit={submitReview}
          className="mt-6 bg-gray-100 p-4 rounded space-y-3"
        >
          <h4 className="font-semibold">Add Your Review</h4>

          {/* Star Rating */}
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => {
              const starValue = i + 1;
              return (
                <FaStar
                  key={i}
                  size={24}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(null)}
                  className={`cursor-pointer ${
                    starValue <= (hover || rating)
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }`}
                />
              );
            })}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Your review..."
            className="w-full border rounded p-2"
            rows="3"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
};

export default ArtworkDetails;

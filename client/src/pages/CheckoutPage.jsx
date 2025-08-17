import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutPage = () => {
  const { id } = useParams(); // artwork ID
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const { data } = await axios.get(`/api/artworks/${id}`);
        setArtwork(data);
      } catch (error) {
        console.error("Error fetching artwork:", error);
      }
    };
    fetchArtwork();
  }, [id]);

  const loadRazorpay = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded.");
      return;
    }

    setLoading(true);
    axios
      .post(`/api/orders/create-order/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(({ data }) => {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: data.currency,
          name: "Artify",
          description: `Payment for ${artwork.title}`,
          image: "/logo.png",
          order_id: data.id,
          handler: function (response) {
            navigate("/my-orders");
          },
          prefill: {
            name: "Artify User",
            email: "test@example.com",
          },
          theme: {
            color: "#6366f1",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        setLoading(false);
      })
      .catch((err) => {
        console.error("Payment error", err);
        alert("Payment initiation failed.");
        setLoading(false);
      });
  };

  if (!artwork) {
    return <div className="text-center mt-20 text-gray-600">Loading artwork details...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-700">Checkout</h2>
      <div className="bg-white shadow rounded-xl p-6">
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="w-full h-64 object-cover rounded-xl mb-4"
        />
        <h3 className="text-xl font-bold">{artwork.title}</h3>
        <p className="text-gray-600">{artwork.category}</p>
        <p className="text-lg font-semibold mt-2">Price: ₹{artwork.price}</p>

        <button
          onClick={loadRazorpay}
          disabled={loading}
          className="mt-6 bg-indigo-600 text-white py-2 px-6 rounded-xl hover:bg-indigo-700 transition-all"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;

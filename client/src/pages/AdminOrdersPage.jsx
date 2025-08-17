import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/admin/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch admin orders", err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-indigo-800">All Orders (Admin)</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="mb-2">
                <p className="text-sm text-gray-600">
                  Order ID: <span className="font-mono">{order._id}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Buyer: <strong>{order.buyer.name}</strong> ({order.buyer.email})
                </p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {order.artworks.map((art) => (
                  <Link to={`/artworks/${art._id}`} key={art._id}>
                    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-2">
                        <h4 className="font-semibold text-gray-800">{art.title}</h4>
                        <p className="text-sm text-gray-600">₹{art.price}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;

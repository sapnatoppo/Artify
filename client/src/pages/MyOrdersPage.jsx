import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/api/orders/my", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-700">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">You haven't purchased any artwork yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border rounded-xl p-4 shadow hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Order ID: {order._id}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Date: {new Date(order.createdAt).toLocaleString()}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {order.artworks.map((art) => (
                  <Link to={`/artworks/${art._id}`} key={art._id}>
                    <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        className="h-40 w-full object-cover"
                      />
                      <div className="p-2">
                        <h4 className="font-semibold">{art.title}</h4>
                        <p className="text-sm text-gray-600">
                          ₹{art.price}
                        </p>
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

export default MyOrdersPage;

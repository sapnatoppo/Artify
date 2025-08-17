import React, { useEffect, useState } from "react";
import axios from "axios";

const MySalesPage = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const { data } = await axios.get("/api/orders/my-sales", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSales(data);
      } catch (error) {
        console.error("Failed to fetch sales", error);
      }
    };

    fetchSales();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">My Sales</h2>

      {sales.length === 0 ? (
        <p className="text-gray-600">No sales yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sales.map((order) => (
            <div
              key={order._id}
              className="bg-white border rounded-xl shadow-sm p-4"
            >
              <img
                src={order.artwork.imageUrl}
                alt={order.artwork.title}
                className="h-48 w-full object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold">
                {order.artwork.title}
              </h3>
              <p className="text-gray-600 text-sm mb-1">
                Price: ₹{order.artwork.price}
              </p>
              <p className="text-gray-600 text-sm mb-1">
                Buyer: {order.buyer.name} ({order.buyer.email})
              </p>
              <p className="text-gray-500 text-sm">
                Sold On: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySalesPage;

import Order from "../models/orderModel.js";
import Artwork from "../models/artworkModel.js";

// Get all orders of a logged-in user (detailed)
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.user.id })
            .populate("artwork", "title imageUrl price sold")
            .sort({ createdAt: -1 });

        const formattedOrders = orders.map(order => ({
            _id: order._id,
            artwork: order.artwork,
            amount: order.amount,
            isPaid: order.isPaid,
            paidAt: order.paidAt,
            paymentInfo: order.paymentInfo,
        }));

        res.status(200).json(formattedOrders);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch your orders", err });
    }
};


// Admin: View all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("buyer", "name email").populate("artwork", "title");
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch all orders", err });
    }
};

// Artist: View orders of artworks they sold
export const getArtistSales = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("artwork", "title artist")
            .populate("buyer", "name email");

        const artistOrders = orders.filter(
            (order) => order.artwork.artist.toString() === req.user.id
        );

        const formattedSales = artistOrders.map(order => ({
            _id: order._id,
            buyer: order.buyer,
            artwork: order.artwork,
            amount: order.amount,
            isPaid: order.isPaid,
            paidAt: order.paidAt,
            paymentInfo: order.paymentInfo,
        }));

        res.status(200).json(formattedSales);

    } catch (err) {
        res.status(500).json({ message: "Failed to fetch sales", err });
    }
};


// Buyer: Get single order detail by ID (buyer only)
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("artwork")
            .populate("buyer", "name email");

        if (!order) return res.status(404).json({ message: "Order not found" });

        // Only the buyer can access logged-in one
        if (order.buyer._id.toString() !== req.user.id) {
            return res.status(403).json({ message: "Access denied" });
        }

        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch order", err });
    }
};

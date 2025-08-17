import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        artwork: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artwork",
            required: true,
        },
        paymentInfo: {
            razor_order_id: { type: String, required: true },
            razorpay_payment_id: { type: String, required: true },
            razorpay_signature: { type: String, required: true },
        },
        amount: {
            type: Number,
            required: true,
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        paidAt: Date,
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
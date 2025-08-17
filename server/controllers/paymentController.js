// controllers/paymentController.js
import Razorpay from "razorpay";
import crypto from "crypto";
import Artwork from "../models/artworkModel.js";
import Order from "../models/orderModel.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
export const createOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error });
  }
};

// Verify payment and mark artwork as sold + save order
export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    artworkId,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // Payment verified
    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }
    //mark artwork sold
    artwork.sold = true;
    await artwork.save();

    // Save order
    await Order.create({
      artwork: artwork._id,
      buyer: req.user.id, // from JWT (make sure `protect` middleware is used on this route)
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      signature: razorpay_signature,
      amount: artwork.price,
    });

    res.status(200).json({
      success: true,
      message: "Payment verified, artwork marked as sold, order recorded",
    });
  } else {
    res
      .status(400)
      .json({ success: false, message: "Payment verification failed" });
  }
};

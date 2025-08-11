import Razorpay from "razorpay";

export const razorpayIns =new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
})
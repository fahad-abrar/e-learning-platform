import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false,
  },
  courseId: {
    type: String,
    required: false,
  },
  paymentInfo: {
    type: String,
    required: false,
  },
});
const Order = mongoose.model("Order", orderSchema);
export default Order;

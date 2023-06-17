const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  email: {
    type: String,
  },
  date: {
    type: Date,
  },
  orders: [
    {
      id: { type: String },
      name: { type: String },
      quantity: { type: Number },
      price: { type: Number },
    },
  ],
  totalAmount: {
    type: Number,
  },
  totalItems: {
    type: Number,
  },
});

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;

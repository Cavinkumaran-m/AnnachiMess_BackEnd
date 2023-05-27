const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
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

const Customer = mongoose.model("users", customerSchema);

module.exports = Customer;

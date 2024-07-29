const mongoose = require("mongoose");
const User = require("./user.model");

const CustomerSchema = new mongoose.Schema({
  favoriteCars: [{ type: Schema.Types.ObjectId, ref: "Car" }],
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
});

const Customer = User.discriminator("customer", CustomerSchema);
module.exports = { Customer };

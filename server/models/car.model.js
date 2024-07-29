const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link3DModel: {
    type: String,
    required: true,
  },
  showroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Showroom",
    required: true,
  },
});

const Car = mongoose.model("Car", CarSchema);
module.exports = Car;

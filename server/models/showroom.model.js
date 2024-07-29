const mongoose = require("mongoose");
const ShowroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }],
});

const Showroom = mongoose.model("Showroom", ShowroomSchema);
module.exports = Showroom;

const User = require("./user.model.js");
const mongoose = require("mongoose")

const AdminSchema = new mongoose.Schema({
  showrooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Showroom",
    },
  ],
});

const Admin = User.discriminator("admin", AdminSchema);
module.exports = { Admin };

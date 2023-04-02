const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});


const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
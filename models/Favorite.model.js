const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  auction: {
    type: mongoose.Types.ObjectId,
    ref: "Auction",
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
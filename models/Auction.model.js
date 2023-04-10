const mongoose = require("mongoose");

const AuctionSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    initialPrice: {
      type: Number,
    },
    start: {
      type: Date,
      default: Date.now,
    },
    end: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Closed"],
      default: "Available",
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

AuctionSchema.virtual("bids", {
	ref: "Bid",
	foreignField: "auction",
	localField: "_id",
  });



// ESTO LUEGO:

AuctionSchema.virtual('favorites', {
  ref: 'Favorite',
  foreignField: 'rent',
  localField: '_id',
  justOne: false
})

const Auction = mongoose.model("Auction", AuctionSchema);

module.exports = Auction;


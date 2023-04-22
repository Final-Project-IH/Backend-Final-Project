const mongoose = require("mongoose");
const {
  REQUIRED_FIELD,
  INVALID_LENGTH,
  INVALID_NUMBER,
} = require("../config/errorMessages");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, REQUIRED_FIELD],
    },
    shortDescription: {
      type: String,
      required: [true, REQUIRED_FIELD],
      maxlength: [50, INVALID_LENGTH],
      minlength: [10, INVALID_LENGTH],
    },
    description: {
      type: String,
      required: [true, REQUIRED_FIELD],
      minlength: [50, INVALID_LENGTH],
      maxlength: [500, INVALID_LENGTH],
    },
    state: {
      type: String,
      enum: ["new", "almost new", "used"],
      required: [true, REQUIRED_FIELD],
    },
    image: {
      type: [String],
      validate: [(v) => Array.isArray(v) && v.length > 0, REQUIRED_FIELD],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, REQUIRED_FIELD],
    },
    shipment: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, REQUIRED_FIELD],
    },
    subcategories: {
      type: ["strings"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

ProductSchema.virtual("auctions", {
  ref: "Auction",
  foreignField: "product",
  localField: "_id",
  justOne: true,
});

ProductSchema.virtual("favorites", {
  ref: "Favorite",
  foreignField: "product",
  localField: "_id",
  justOne: true,
});

ProductSchema.virtual("categories", {
  ref: "Category",
  foreignField: "title",
  localField: "_id",
});

ProductSchema.virtual("bids", {
  ref: "Bid",
  foreignField: "title",
  localField: "_id",
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;

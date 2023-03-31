const mongoose = require("mongoose");
const { REQUIRED_FIELD } = require("../config/errorMessages");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, REQUIRED_FIELD],
    },
    description: {
      type: String,
      required: [true, REQUIRED_FIELD],
    },
    initialprice: {
      type: Number,
      required: [true, REQUIRED_FIELD],
    },
    state: {
      type: String,
      enum: ["new", "almost new", "used"],
      required: [true, REQUIRED_FIELD],
    },
    image: {
      type: [String],
      required: [true, REQUIRED_FIELD],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, REQUIRED_FIELD],
    },
    category: {
      //quizás un modelo de categoría
      type: String,
      enum: ["Clothes", "XXXXX", "XXXXX"], //pensaaaaaaaaaaaaaaaaaaaaaaar y preguntar como hacer subcategorias
      required: [true, REQUIRED_FIELD],
    },
    shipment: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
  },
  {
    timestamps: true,
  }
);

productSchema.virtual("bids", {
  ref: "Bid",
  foreignField: "product", //nombrar luego el producto en el esquema del bid
  localField: "_id",
  justOne: false,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

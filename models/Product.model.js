const mongoose = require("mongoose");
const { REQUIRED_FIELD, INVALID_LENGTH, INVALID_NUMBER } = require("../config/errorMessages");

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
      minlength: [20, INVALID_LENGTH],
    },
    description: {
      type: String,
      required: [true, REQUIRED_FIELD],
      minlength: [50, INVALID_LENGTH],
      maxlength: [300, INVALID_LENGTH],
    },
    initialPrice: {
      type: Number,
      required: [true, REQUIRED_FIELD],
      min:[1, INVALID_NUMBER]
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
  },
  {
    timestamps: true,
  }

  // status: {
  //   type: String,
  //   enum: ["avalaible", "closed"],
  //   default: "avalaible",
  // },
);

ProductSchema.virtual("auctions", {
  ref: "Auction",
  foreignField: "product",
  localField: "_id",
  justOne: true, //Debemos poner false? que pasa si no ponemos nada o true??
});

ProductSchema.virtual('favorites', {
  ref: 'Favorite',
  foreignField: 'product',
  localField: '_id',
  justOne: true,
})

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;

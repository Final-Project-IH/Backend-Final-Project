const Auction = require("../models/Auction.model");
const Favorite = require("../models/Favorite.model");
const Product = require("../models/Product.model");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User.model");

/*Products*/

module.exports.create = (req, res, next) => {
  const {
    name,
    shortDescription,
    description,
    initialPrice,
    state,
    image,
    owner,
    shipment,
  } = req.body;
  Product.create({
    name,
    shortDescription,
    description,
    initialPrice,
    state,
    image,
    owner,
    shipment,
  })
    .then((productCreated) => {
      res.status(StatusCodes.CREATED).json(productCreated);
    })
    .catch(next);
};

module.exports.list = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch();
};

module.exports.detail = (req, res, next) => {
  Product.findById(req.params.id)
  .then((product)=>{
    res.status(200).json(product)
  })
  .catch(next)
}

/*Search*/

module.exports.searchBar = (req, res, next) => {
  Product.find({
    name: { $regex: req.body.value, $options: "i" }
  })
  .then((products)=>{
    res.json(products)
  })
  .catch((err) => next(err))
}

/*Favorites*/

module.exports.favorites = (req, res, next) => {
  const user = req.currentUserId;
  const product = req.params.id;
  const favorites = { user, product };

  Favorite.findOne({ user, product }).then((favorite) => {
    if (favorite) {
      return Favorite.findByIdAndDelete(favorite.id).then((deletedFavorite) => {
        res.status(204).json({ fav: deletedFavorite });
      });
    } else {
      return Favorite.create(favorites).then(() => {
        res.status(201).json({ ok: favorites });
      });
    }
  });
};

module.exports.listFavorites = (req, res, next) => {
  User.findById(req.currentUserId)
    .populate("favorites")
    .then((user) => {
      return Favorite.find({ user: req.currentUserId })
        .populate("user")
        .then((favorites) => {
          res.status(200).json({ favorites });
        });
    })
    .catch(next);
};

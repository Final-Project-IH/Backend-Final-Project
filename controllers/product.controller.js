const Auction = require("../models/Auction.model");
const Favorite = require("../models/Favorite.model");
const Product = require("../models/Product.model");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User.model");

/*Products*/

module.exports.create = (req, res, next) => {
  req.body.owner = req.currentUserId;

  let image = [];

  if (req.files) {
    image = req.files.map((file) => file.path);
  }
  res.status(200);
  Product.create({ ...req.body, image })
    .then((productCreated) => {
      const { initialPrice, start, end } = req.body;
      Auction.create({
        product: productCreated._id,
        initialPrice,
        start,
        end,
        owner: req.currentUserId,
      });
      res.status(StatusCodes.CREATED).json(productCreated);
    })
    .catch(next);
};


/*Search*/

module.exports.searchBar = (req, res, next) => {
  const { name } = req.body;
  Product.find({
    name: { $regex: name, $options: "i" },
  })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => next(err));
};

/*Favorites*/

module.exports.favorites = (req, res, next) => {
  const user = req.currentUserId;
  const auction = req.params.id;
  const newFavorite = { user, auction };

  Favorite.findOne({ user, auction }).then((favorite) => {
    if (favorite) {
      return Favorite.findByIdAndDelete(favorite.id).then((deletedFavorite) => {
        res.status(200).json({ removed: true, favorite: deletedFavorite});
      });
    } else {
      return Favorite.create(newFavorite).then((createdFavorite) => {
        res.status(201).json({ removed: false, favorite: createdFavorite});
      });
    }
  });
};

module.exports.listFavorites = (req, res, next) => {
  Favorite.find({ user: req.currentUserId })
    .populate("user")
    .then((favorites) => {
      res.status(200).json({ favorites });
    })
    .catch(next);
};

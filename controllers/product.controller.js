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
    state,
    image,
    owner,
    shipment,
    category,
    subcategories,
    initialPrice,
    start,
    end
  } = req.body;
  Product.create({
    name,
    shortDescription,
    description,
    state,
    image,
    owner,
    shipment,
    category,
    subcategories
  })
    .then((productCreated) => {
      Auction.create({
        product: productCreated._id,
        initialPrice,
        start,
        end,
        owner
      })
      res.status(StatusCodes.CREATED).json(productCreated);
    })
    .catch(next);
};

// module.exports.list = (req, res, next) => {
//   Product.find()
//     .then((products) => {
//       res.json(products);
//     })
//     .catch(next);
// }; ESTO YA NO SIRVE PORQUE NOS CONVIENE TRAERNOS LAS AUCTS

// module.exports.fashionList = (req, res, next)

module.exports.userlist = (req, res, next) => {
  Product.find({ owner: req.currentUserId })
    .populate("owner")
    .then((products) => {
      res.json(products);
    })
    .catch(next);
};

// module.exports.detail = (req, res, next) => {
//   Product.findById(req.params.id)
//     .then((product) => {
//       res.status(200).json(product);
//     })
//     .catch(next);
// }; ESTO YA NO SIRVE PORQUE NOS CONVIENE TRAERNOS LAS AUCTS


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

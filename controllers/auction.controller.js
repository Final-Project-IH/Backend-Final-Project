const Auction = require("../models/Auction.model");
const Bid = require("../models/Bid.model");
const Product = require("../models/Product.model");

module.exports.list = (req, res, next) => {
  Auction.find()
    .populate("product")
    .then((auctions) => {
      res.json(auctions);
    })
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  Auction.findById(req.params.id)
    .populate({
      path: "product",
      populate: "owner",
    })
    .populate("bids")
    .populate({
      path: "bids",
      populate: "bidder",
    })
    .populate("favorites")

    .then((auction) => {
      res.status(200).json(auction);
    })
    .catch(next);
};

module.exports.filterCategory = (req, res, next) => {
  Product.find({ category: req.params.id })
    .then((products) => {
      Auction.find({ product: products }).then((auctions) => {
        res.json(auctions);
      });
    })
    .catch(next);
};

/* Category  Fashion*/

module.exports.filterClothes = (req, res, next) => {
  Product.find({ category: req.params.id, subcategories: "Clothes" })
    .then((products) => {
      Auction.find({ product: products })
        .populate("product")
        .populate("favorites")
        .then((auctions) => {
          res.json(auctions);
        });
    })
    .catch(next);
};

module.exports.filterAccesories = (req, res, next) => {
  Product.find({ category: req.params.id, subcategories: "Accesories" })
    .then((products) => {
      Auction.find({ product: products })
        .populate("product")
        .then((auctions) => {
          res.json(auctions);
        });
    })
    .catch(next);
};

module.exports.filterShoes = (req, res, next) => {
  Product.find({ category: req.params.id, subcategories: "Shoes" })
    .then((products) => {
      Auction.find({ product: products })
        .populate("product")
        .then((auctions) => {
          res.json(auctions);
        });
    })
    .catch(next);
};

/* Category Home */

module.exports.filterDecoration = (req, res, next) => {
  Product.find({ category: req.params.id, subcategories: "Decoration" })
    .then((products) => {
      Auction.find({ product: products })
        .populate("product")
        .then((auctions) => {
          res.json(auctions);
        });
    })
    .catch(next);
};

module.exports.filterFurniture = (req, res, next) => {
  Product.find({ category: req.params.id, subcategories: "Furniture" })
    .then((products) => {
      Auction.find({ product: products })
        .populate("product")
        .then((auctions) => {
          res.json(auctions);
        });
    })
    .catch(next);
};

module.exports.filterKitchenware = (req, res, next) => {
  Product.find({ category: req.params.id, subcategories: "Kitchenware" })
    .then((products) => {
      Auction.find({ product: products })
        .populate("product")
        .then((auctions) => {
          res.json(auctions);
        });
    })
    .catch(next);
};

/* Category Art */

module.exports.filterPrints = (req, res, next) => {
  Product.find({ category: req.params.id, subcategories: "Prints" })
    .then((products) => {
      Auction.find({ product: products })
        .populate("product")
        .then((auctions) => {
          res.json(auctions);
        });
    })
    .catch(next);
};

module.exports.filterPhotography = (req, res, next) => {
  Product.find({ category: req.params.id, subcategories: "Photography" })
    .then((products) => {
      Auction.find({ product: products })
        .populate("product")
        .then((auctions) => {
          res.json(auctions);
        });
    })
    .catch(next);
};

module.exports.filterFrames = (req, res, next) => {
  Product.find({ category: req.params.id, subcategories: "Frames" })
    .then((products) => {
      Auction.find({ product: products })
        .populate("product")
        .then((auctions) => {
          res.json(auctions);
        });
    })
    .catch(next);
};

module.exports.filterBooks = (req, res, next) => {
  Product.find({ category: req.params.id, subcategories: "Books" })
    .then((products) => {
      Auction.find({ product: products })
        .populate("product")
        .then((auctions) => {
          res.json(auctions);
        });
    })
    .catch(next);
};

module.exports.filterMusic = (req, res, next) => {
  Product.find({ category: req.params.id, subcategories: "Music" })
    .then((products) => {
      Auction.find({ product: products })
        .populate("product")
        .then((auctions) => {
          res.json(auctions);
        });
    })
    .catch(next);
};

/* Antiques */

module.exports.filterAntiqueHome = (req, res, next) => {
  Product.find({ category: req.params.id, subcategories: "Home & Decoration" })
    .then((products) => {
      Auction.find({ product: products })
        .populate("product")
        .then((auctions) => {
          res.json(auctions);
        });
    })
    .catch(next);
};

module.exports.filterAntiqueArt = (req, res, next) => {
  Product.find({ category: req.params.id, subcategories: "Art & Frames" })
    .then((products) => {
      Auction.find({ product: products })
        .populate("product")
        .then((auctions) => {
          res.json(auctions);
        });
    })
    .catch(next);
};

module.exports.filterAntiqueFashion = (req, res, next) => {
  Product.find({
    category: req.params.id,
    subcategories: "Fashion & Accesories",
  })
    .then((products) => {
      Auction.find({ product: products })
        .populate("product")
        .then((auctions) => {
          res.json(auctions);
        });
    })
    .catch(next);
};

module.exports.changeStatus = (req, res, next) => {
  Auction.findByIdAndUpdate(req.params.id, { status: "Closed" }, { new: true })
    .populate("product")
    .then((auction) => {
      console.log(auction);
      res.status(201).json(auction);
    })
    .catch(next);
};

/*USER PROFILE*/

module.exports.userlist = (req, res, next) => {
  Auction.find({ owner: req.currentUserId })
    .populate("product")
    .then((products) => {
      res.json(products);
    })
    .catch(next);
};

module.exports.winnedAuct = (req, res, next) => {
  Auction.find({ status:"Closed" })
  .populate({
    path: "product",
    populate: "owner",
  })
  .populate({
    path: "bids",
    populate: "bidder",
  })
  .then((products) => {
    res.json(products);
  })
  .catch(next);

}

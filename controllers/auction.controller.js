const Auction = require("../models/Auction.model");
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
    .populate("product")
    .populate("bids")
    .populate({
      path: "bids",
      populate: "bidder",
    })

    .then((auction) => {
      res.status(200).json(auction);
    })
    .catch(next);
};

module.exports.filterCategory = (req, res, next) => {
  Product.find({ category: req.params.id })
    .then((products) => {
        Auction.find({product: products})
        .then((auctions)=>{
            res.json(auctions)
        })
    })
    .catch(next);
};

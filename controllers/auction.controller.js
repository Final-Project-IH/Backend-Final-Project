const Auction = require("../models/Auction.model");
const Bid = require("../models/Bid.model");

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
        path: 'bids',
        populate: 'bidder'
    })

    .then((auction) => {
      res.status(200).json(auction);
    })
    .catch(next); //NO ACABA DE FUNCIONAR
};

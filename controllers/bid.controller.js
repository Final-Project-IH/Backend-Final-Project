const Auction = require("../models/Auction.model");
const Bid = require("../models/Bid.model");
const Notification = require("../models/Notification.model");

module.exports.create = (req, res, next) => {
  const { offer } = req.body;
  const auction = req.params.id;
  const bidder = req.currentUserId;

  Bid.create({ offer, bidder, auction })
    .then((Createdbid) => {
      Auction.findByIdAndUpdate(
        req.params.id,
        { initialPrice: Createdbid.offer },
        { new: true }
      )
        .then((UpdatedAuction) => {
          Bid.find({ auction: auction })
            .sort("-offer")
            .limit(1)
            .skip(1)
            .then(([previousHighestBid]) => {
              if (previousHighestBid) {
                const notifications = {
                  auction: auction,
                  user: previousHighestBid.bidder,
                  type: "Surpassed Bid",
                };
                Notification.create(notifications).then((notification) => {
                  console.log("notification created");
                });
              }
              res.status(200).json(Createdbid);
            })
            .catch(next)
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.list = (req, res, next) => {
  Bid.find({ auction: req.params.id })
    .then((bid) => {
      res.status(200).json(bid);
    })
    .catch(next);
};


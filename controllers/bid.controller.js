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


module.exports.userBidList = (req, res, next) => {
  Bid.find({ bidder: req.currentUserId })
    .populate({
      path: "auction",
      populate: "product",
    })
    .then((products) => {
      const uniqueBids = [];
      products.forEach(bid => {
        const theBidIndex = uniqueBids.findIndex(pushedBid => pushedBid.auction._id.toString() === bid.auction._id.toString());
        if (theBidIndex === -1) {
          uniqueBids.push(bid);
        } else if (bid.offer > uniqueBids[theBidIndex].offer) {
          uniqueBids.splice(theBidIndex, 1, bid);
        }
      });
      res.json(uniqueBids);
    })
    .catch(next);
};

// module.exports.userBidList = (req, res, next) => {
//   Bid.find({ bidder: req.currentUserId })
//     .populate({
//       path: "auction",
//       populate: "product",
//     })
//     .then((products) => {
//       res.json(products);
//     })
//     .catch(next);
// };

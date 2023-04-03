const Bid = require("../models/Bid.model");

//ESTO FUNCIONA! ----- /!\

module.exports.create = (req, res, next) => {
    const {offer} = req.body;
    const auction = req.params.auctionId;
    const bidder = req.currentUserId;

    Bid.create({ offer, bidder, auction })
      .then(bidCreated => {
        res.status(200).json(bidCreated);
      })
      .catch(next)
  }

// module.exports.create = (req, res, next) => {
//   const { offer } = req.body;
//   const auction = req.params.auctionId;
//   const bidder = req.currentUserId;

//   Bid.findOne({ auction: auction }).then((bid) => {
//     if (!bid) {
//       Bid.create({ offer, bidder, auction }).then((bidCreated) => {
//         res.status(200).json(bidCreated);
//       });
//     } else {
//       Bid.updateOne({ offer, bidder}).then((UpdatedBid) => {
//         res.status(200).json(UpdatedBid);
//       });
//     }
//   });
// };

const Auction = require("../models/Auction.model");
const Bid = require("../models/Bid.model");

module.exports.create = (req, res, next) => {
  const { offer } = req.body;
  const auction = req.params.id;
  const bidder = req.currentUserId;

  Bid.create({ offer, bidder, auction })
    .then((Createdbid) => {
      Auction.findByIdAndUpdate(req.params.id, {initialPrice: Createdbid.offer}, { new: true } )
      .then((UpdatedAuction) => {
        res.status(200).json(UpdatedAuction);
      })
      .catch(next);
      
      res.status(200).json(Createdbid);
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


















//LO DEJO POR SI ACASO PERO ES PARA ELIMINAR:

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

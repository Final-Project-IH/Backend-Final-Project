const Product = require("../models/Product.model");
const Auction = require("../models/Auction.model");

// module.exports.create = (req, res, next) => {
//   Product.findById(req.params.id)
//     .then(() => {
//       const { product, price } = req.body;
//       Auction.create({ product, price }).then((auction) => {
//         res.json(auction);
//       });
//     })
//     .catch(next);
// };


module.exports.list = (req, res, next) => {
    //creo que habría que meter un creador en el modelo.......................................
}

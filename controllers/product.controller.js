const Product = require("../models/Product.model")
const { StatusCodes } = require('http-status-codes');

module.exports.create = (req,res,next) => {
    const { name, shortDescription, description, initialPrice, state, image, owner, shipment} = req.body;
    Product.create({ name, shortDescription, description, initialPrice, state, image, owner,shipment})
      .then(productCreated => {
        res.status(StatusCodes.CREATED).json(productCreated);
      })
      .catch(next)
  }

module.exports.list = (req, res, next) => {
  Product.find()
  .then((products) => {
    res.json(products)
  })
  .catch()
}





// module.exports.delete = (req, res, next) => {
//     Product.findByIdAndDelete(req.params.id)
//       .then(() => {
//         res.status(StatusCodes.OK)
//       })
//       .catch(next)
//   };
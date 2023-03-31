const Product = require("../models/Product.model")
const { StatusCodes } = require('http-status-codes');

module.exports.create = (req,res,next) => {
    const { name, description, initialprice, state, image,user,category, shipment} = req.body;
    Product.create({ name, description, initialprice, state, image,user,category, shipment})
      .then(productCreated => {
        res.status(StatusCodes.CREATED).json(productCreated);
      })
      .catch(next)
  }

module.exports.delete = (req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(StatusCodes.OK)
      })
      .catch(next)
  };

module.exports.update = (req, res, next) => {

	const editProduct = {
		...req.body,
		user: req.user.id,
	}

	Product.findByIdAndUpdate(req.params.id, editProduct)
		.then((productUpdated) => {
			res.status(StatusCodes.OK).json(productUpdated);
		})
		.catch(next)
}
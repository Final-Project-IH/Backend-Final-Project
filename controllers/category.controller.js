const Category = require("../models/Category.model");

module.exports.categoryList = (req, res, next) => {
    Category.find()
      .then((categories) => {
        res.json(categories);
      })
      .catch(next);
  };
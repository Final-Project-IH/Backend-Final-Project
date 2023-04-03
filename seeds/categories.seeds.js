const CATEGORIES = require("../data/categories.data.json");
const mongoose = require("mongoose");
const Category = require("../models/Category.model");
require("../config/db.config");


mongoose.connection.once("open", () => {
    Category.create(CATEGORIES)
    .then((createdCategories) => {
      console.log("!!!! Creating Categories...");
      return mongoose.connection.close();
    })
    .then(() => {
      console.log("Connection closed");
      process.exit(1);
    })
    .catch((err) => {
      console.error(err);
      process.exit(0);
    });
});
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
      title: {
        type: String,
      },
      subcategory: {
        type: [String],
      },
      
  });
  
  const Category = mongoose.model("Category", categorySchema);
  
  module.exports = Category;
  
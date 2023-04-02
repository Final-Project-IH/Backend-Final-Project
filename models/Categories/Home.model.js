const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        enum: ["Decoration", "Furniture", "Kitchenware"],
      },

      //deberiamos hacer product y ponerle un virtual en product???
      
  });
  
  const Home = mongoose.model("Home", homeSchema);
  
  module.exports = Home;
  
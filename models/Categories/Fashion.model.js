const mongoose = require("mongoose");

const fashionSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        enum: ["Clothes", "Accesories", "Shoes"],
      },

      //deberiamos hacer product y ponerle un virtual en product???
      
  });
  
  const Fashion = mongoose.model("Fashion", fashionSchema);
  
  module.exports = Fashion;
  
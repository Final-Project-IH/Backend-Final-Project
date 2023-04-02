const mongoose = require("mongoose");

const antiqueSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        enum: ["Home & decoration", "Art & frames", "Fashion & Accesories"],
      },
      

      //deberiamos hacer product y ponerle un virtual en product???

      
  });
  
  const Antiques = mongoose.model("Home", antiqueSchema);
  
  module.exports = Antiques;
  
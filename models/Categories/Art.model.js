const mongoose = require("mongoose");

const artSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        enum: ["Prints", "Photography", "Frames", "Books", "Music"],
      },

      //deberiamos hacer product y ponerle un virtual en product???
      
  });
  
  const Art = mongoose.model("Home", artSchema);
  
  module.exports = Art;
  
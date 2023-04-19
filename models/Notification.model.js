const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
      auction: {
        type: mongoose.Types.ObjectId,
        ref: "Auction",
        required: true,
      },
      type: {
        type: String,
        enum: ["Lost Auction", "Winned Auction", "Surpassed Bid"],//poner en mayusculas y guion bajo
        required: true,
      },
      read: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
      toJSON: {
        virtuals: true
      },
      toObject: {
        virtuals: true
      }
    }
  );
  
  
  const Notification = mongoose.model("Notification", NotificationSchema);
  
  module.exports = Notification;
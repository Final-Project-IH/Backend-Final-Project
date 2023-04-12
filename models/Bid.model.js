const mongoose = require("mongoose")

const BidSchema = new mongoose.Schema({
	auction: {
		type: mongoose.Types.ObjectId,
		ref: "Auction",
		required: true,
	},
	offer: {     
		type: Number,
        required: true,  
	}, 
	bidder: {
		type: mongoose.Types.ObjectId,
		ref: "User",
		required: true,
	}
},
{
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  })


const Bid = mongoose.model("Bid", BidSchema)

module.exports = Bid
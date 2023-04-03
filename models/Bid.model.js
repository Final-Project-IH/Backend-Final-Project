const mongoose = require("mongoose")

const BidSchema = new mongoose.Schema({
	auction: {
		type: mongoose.Types.ObjectId,
		ref: "Auction",
		required: true,
	},
	offer: {           //hay que controlar que no puedas ofertar menos precio que el actual de la subasta
		type: Number,
        required: true,  
	}, 
	bidder: {
		type: mongoose.Types.ObjectId,
		ref: "User",
		required: true,
	}
})


const Bid = mongoose.model("Bid", BidSchema)

module.exports = Bid
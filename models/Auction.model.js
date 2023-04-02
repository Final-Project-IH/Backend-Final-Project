const mongoose = require("mongoose")

const AuctionSchema = new mongoose.Schema({
	product: {
		type: mongoose.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	price: {
		type: Number,  //está bien? como vincularíamos este price con el precio inicial del producto??
	}, 
	bids: {
		type: mongoose.Types.ObjectId,
		ref: "Bid",
		required: true,
	},
	start: {  //preguntar cómo se tendría que poner
		type: Date,
		default: Date.now,
		required: true,
	},
	end: {
		type: Date,
		default: Date.now,
		required: true,
	},
	status: {
		type: String,
		enum: ["Available", "Closed"],
		default: "Available",
	}

// owner: {
	// 	type: mongoose.Types.ObjectId,
	// 	ref: "User",
	// 	required: true,
	// },

})

AuctionSchema.virtual("bids", {
	ref: "Bid",
	foreignField: "product", 
	localField: "_id",
	justOne: false,
  });


// ESTO LUEGO:

// rentSchema.virtual('favorites', {
//   ref: 'Favorite',
//   foreignField: 'rent',
//   localField: '_id',
//   justOne: false
// })


const Auction = mongoose.model("Auction", AuctionSchema)

module.exports = Auction
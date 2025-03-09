const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  startPrice: Number,
  currentBid: Number,
  endTime: Date,
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bids: [{ bidder: String, amount: Number, time: Date }],
});

module.exports = mongoose.model("Auction", auctionSchema);

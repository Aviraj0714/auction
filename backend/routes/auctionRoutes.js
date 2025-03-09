const express = require("express");
const Auction = require("../models/auction");
const router = express.Router();
const io = require("../websocket/websocket");

// Get all auctions
router.get("/", async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch auctions" });
  }
});

// Place a bid
router.post("/:id/bid", async (req, res) => {
  try {
    const { bid } = req.body;
    const auction = await Auction.findById(req.params.id);

    if (!auction || bid <= auction.currentBid) {
      return res.status(400).json({ error: "Invalid bid amount" });
    }

    auction.currentBid = bid;
    await auction.save();

    io.getIO().emit("bidUpdate", { auctionId: auction._id, bid });
    res.json(auction);
  } catch (error) {
    res.status(500).json({ error: "Failed to place bid" });
  }
});

module.exports = router;

import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import socket from "../utils/socket";
import axios from "axios";

const AuctionItem = ({ auction }) => {
  const [bidAmount, setBidAmount] = useState("");

  const placeBid = async () => {
    if (!bidAmount || bidAmount <= auction.currentBid) {
      alert("Bid must be higher than the current bid!");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auctions/${auction._id}/bid`, { bid: bidAmount });
      socket.emit("newBid", { auctionId: auction._id, bid: bidAmount });
      setBidAmount("");
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} className="mb-4">
      <Card>
        <Card.Img variant="top" src={auction.image} alt={auction.title} />
        <Card.Body>
          <Card.Title>{auction.title}</Card.Title>
          <Card.Text>Current Bid: ${auction.currentBid}</Card.Text>
          <Form.Control
            type="number"
            placeholder="Enter bid amount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
          />
          <Button variant="primary" className="mt-2" onClick={placeBid}>
            Place Bid
          </Button>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default AuctionItem;

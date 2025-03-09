import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import useSocket from "../hooks/useSocket";

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    axios.get("/api/auctions").then((res) => setAuctions(res.data));

    if (socket) {
      socket.on("newBid", (data) => {
        setAuctions((prev) => prev.map((a) => (a._id === data.auctionId ? { ...a, currentBid: data.amount } : a)));
      });
    }
  }, [socket]);

  const placeBid = (auctionId, amount) => {
    socket.emit("placeBid", { auctionId, amount });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <div className="d-flex flex-wrap justify-content-center">
        {auctions.map((auction) => (
          <Card key={auction._id} className="m-3 p-2 shadow-lg">
            <Card.Img variant="top" src={auction.image} />
            <Card.Body>
              <Card.Title>{auction.title}</Card.Title>
              <Card.Text>Current Bid: ${auction.currentBid}</Card.Text>
              <Button onClick={() => placeBid(auction._id, auction.currentBid + 10)}>Place Bid</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default AuctionList;

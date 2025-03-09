import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function Dashboard() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/signin"); // Redirect to Signin if not authenticated
      return;
    }

    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:5001/auctions");
        setItems(res.data);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="container mt-4">
      <motion.h2
        className="text-center text-primary mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Auction Dashboard
      </motion.h2>

      <motion.div
        className="text-center mb-4"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/post-auction" className="btn btn-success btn-lg shadow-sm">
          <i className="fas fa-plus-circle"></i> Post New Auction
        </Link>
      </motion.div>

      <div className="row">
        {items.length > 0 ? (
          items.map((item) => (
            <motion.div
              key={item._id}
              className="col-md-4 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="card auction-card">
                <img
                  src={item.image || "/images/default-auction.jpg"}
                  className="card-img-top"
                  alt={item.itemName}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.itemName}</h5>
                  <p className="card-text">
                    <strong>Current Bid:</strong> ${item.currentBid}
                  </p>
                  <p
                    className={`status ${
                      item.isClosed ? "closed" : "open"
                    } fw-bold`}
                  >
                    {item.isClosed ? "Closed" : "Open for Bidding"}
                  </p>
                  <Link to={`/auction/${item._id}`} className="btn btn-primary">
                    View Auction
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            className="col-12 text-center mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <img src="/images/no-auctions.svg" alt="No Auctions" className="no-auctions-img" />
            <h4 className="text-secondary mt-3">No active auctions right now</h4>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

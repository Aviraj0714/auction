import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

function Landing() {
  return (
    <div
      className="container-fluid landing-page d-flex align-items-center justify-content-center text-center"
      style={{
        minHeight: "100vh",
        // backgroundImage: "url(https://img.freepik.com/free-vector/background-realistic-abstract-technology-particle_23-2148431735.jpg?ga=GA1.1.1121053180.1739993045&semt=ais_hybrid)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        color: "white",
      }}
    >
      {/* Dark Overlay for Better Readability */}
      <div className="overlay" style={{ 
        background: "rgba(0, 0, 0, 0.6)", 
        position: "absolute", 
        width: "100%", 
        height: "100%" 
      }}></div>

      <div className="container position-relative">
        <div className="row align-items-center">
          {/* Left Section - Text Content */}
          <div className="col-md-6 text-start">
            <motion.h1 
              className="display-3 fw-bold"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              Welcome to Auction App
            </motion.h1>

            <motion.p 
              className="lead"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Buy and sell items through a competitive bidding process. The highest bid wins! Join our platform for the most exciting auctions.
            </motion.p>

            <motion.a 
              href="/Dashboard" 
              className="btn btn-primary btn-lg mt-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              Explore Auctions
            </motion.a>
          </div>

          {/* Right Section - SVG Illustration */}
          <div className="col-md-6">
            <motion.img
              src="https://img.freepik.com/free-vector/round-auction-isometric-emblem-with-auctioneer-three-men-with-tablets-their-hands-illustration_1284-31362.jpg"
              alt="Auction Illustration"
              className="img-fluid"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;

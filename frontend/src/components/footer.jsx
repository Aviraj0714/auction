import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light">
      <div className="container text-center">
        <p>&copy; 2024 Auction App. All rights reserved.</p>
        <p>Welcome to the best place to buy and sell items through auctions!</p>
      </div>
    </footer>
  );
};

export default Footer;

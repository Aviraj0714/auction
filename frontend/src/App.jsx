import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/register";
import Signin from "./components/login";
import Dashboard from "./components/dashboard";
import AuctionItem from "./components/AuctionItem";
import PostAuction from "./components/postauction";
import Landing from "./components/landing";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/auction/:id" element={<AuctionItem />} />
          <Route path="/post-auction" element={<PostAuction />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

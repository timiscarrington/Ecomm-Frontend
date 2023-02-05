import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import { Routes, Route } from 'react-router-dom'
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import About from "./components/About";
import Contact from "./components/Contact"
import Register from "./components/Register";
import Login from "./components/Login";
import SavedCart from "./components/SavedCart";



function App() {
  const [loggedIn, setLoggedIn] = useState(false);


  const handleLogin = () => {
    setLoggedIn(true);
  };
console.log(loggedIn)
  return (
    <>
      <Navbar loggedIn={loggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/checkout" element={<Checkout />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={
          <Login handleLogin={handleLogin} />
        } />
        <Route exact path="/saved-carts/:id" element={<SavedCart />} />
      </Routes>
    </>
  );
}

export default App;

import { useState } from "react"
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import ProductCard from "./components/ProductCard";
import {Route, Routes} from 'react-router-dom';
import Admin from "./pages/Admin";
import Cart from "./pages/Cart.jsx";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import './App.css'

const App=() =>{
  return (
    <div className="min-h-screen bg-stone-100">
      <Navbar />
      <CartDrawer />
      <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </main>    
    </div>
  )
};
export default App;


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Menu, X } from 'lucide-react';
import './Homepage.css';
import logo from "../../assets/logo/logo_name.png"
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    return (
      <header className="header">
        <div className="container header-content">
          <div className="logo-container">
            <img src={logo} alt="Company Logo" className="logo" />
          </div>
  
          <nav className="desktop-nav">
            <a onClick={() => navigate('/')} className="nav-link">Home</a>
            <a onClick={() => navigate('/about')} className="nav-link">About Us</a>
            <a onClick={() => navigate('/services')} className="nav-link">Services</a> 
            <a onClick={() => navigate('/products')} className="nav-link">Products</a>         
            <a onClick={() => navigate('/case')} className="nav-link">Case Studies</a>
            <a onClick={() => navigate('/tnp')} className="nav-link">Training and Development</a>
            <a onClick={() => navigate('/contact')} className="nav-link">Contact Us</a>
          </nav>
  
          <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-button">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-nav"
          >
             <a onClick={() => navigate('/')} className="mobile-nav-link">Home</a>
            <a onClick={() => navigate('/about')} className="mobile-nav-link">About Us</a>
            <a onClick={() => navigate('/services')} className="mobile-nav-link">Services</a> 
            <a onClick={() => navigate('/products')} className="mobile-nav-link">Products</a>         
            <a onClick={() => navigate('/case')} className="mobile-nav-link">Case Studies</a>
            <a onClick={() => navigate('/tnp')} className="mobile-nav-link">Training and Development</a>
            <a onClick={() => navigate('/contact')} className="mobile-nav-link">Contact Us</a>
          </motion.nav>
        )}
      </header>
    );
  };

  export default Header;
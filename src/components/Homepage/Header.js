import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Menu, X } from 'lucide-react';
import './Homepage.css';
import logo from "../../assets/logo/logo_name.png"
import { useNavigate, useLocation } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  
  const headerclick = (destination) => {
    return () => {
      console.log(destination);
      navigate(destination);
    }
  }

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  }
  
    return (
      <header className="header">
        <div className="container header-content">
          <div className="logo-container">
            <img src={logo} alt="Company Logo" className="logo" />
          </div>
  
          <nav className="desktop-nav">
            <a onClick={headerclick('/')} className={`nav-link ${isActive('/')}`}>Home</a>
            <a onClick={headerclick('/about')} className={`nav-link ${isActive('/about')}`}>About Us</a>
            <a onClick={headerclick('/services')} className={`nav-link ${isActive('/services')}`}>Services</a> 
            <a onClick={headerclick('/products')} className={`nav-link ${isActive('/products')}`}>Products</a>         
            <a onClick={headerclick('/case')} className={`nav-link ${isActive('/case')}`}>Case Studies</a>
            <a onClick={headerclick('/tnp')} className={`nav-link ${isActive('/tnp')}`}>Training and Development</a>
            {/* <a onClick={headerclick('/events')} className={`nav-link ${isActive('/events')}`}>Events</a> */}
            <a onClick={headerclick('/contact')} className={`nav-link ${isActive('/contact')}`}>Contact Us</a>
            <a onClick={headerclick('/tech')} className={`nav-link ${isActive('/tech')}`}>Technologies</a>

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
            <a onClick={() => navigate('/')} className={`mobile-nav-link ${isActive('/')}`}>Home</a>
            <a onClick={() => navigate('/about')} className={`mobile-nav-link ${isActive('/about')}`}>About Us</a>
            <a onClick={() => navigate('/services')} className={`mobile-nav-link ${isActive('/services')}`}>Services</a> 
            <a onClick={() => navigate('/products')} className={`mobile-nav-link ${isActive('/products')}`}>Products</a>         
            <a onClick={() => navigate('/case')} className={`mobile-nav-link ${isActive('/case')}`}>Case Studies</a>
            <a onClick={() => navigate('/tnp')} className={`mobile-nav-link ${isActive('/tnp')}`}>Training and Development</a>
            {/* <a onClick={() => navigate('/events')} className={`mobile-nav-link ${isActive('/events')}`}>Events</a> */}
            <a onClick={() => navigate('/contact')} className={`mobile-nav-link ${isActive('/contact')}`}>Contact Us</a>
            <a onClick={() => navigate('/tech')} className={`mobile-nav-link ${isActive('/tech')}`}>Technologies</a>

          </motion.nav>
        )}
      </header>
    );
  };

  export default Header;
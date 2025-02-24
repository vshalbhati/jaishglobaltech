import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Menu, X } from 'lucide-react';
import './Homepage.css';
import logo from "../../assets/logo/logo_jaish.png"
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 100;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerclick = (destination) => {
    return () => {
      navigate(destination);
      setIsOpen(false); // Close mobile menu after navigation
    }
  }

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.7, delay: 0.2 } },
  };

  const navLinkVariants = {
    hover: { scale: 1.1, color: '#007bff', transition: { duration: 0.2 } },
  };

  const mobileMenuVariants = {
    open: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
    closed: { x: '-100%', opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <motion.header
      className={`header ${isScrolled ? 'header-scrolled' : ''}`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container header-content">
        <motion.div
          className="logo-container"
          variants={logoVariants}
          initial="initial"
          animate="animate"
        >
          <img src={logo} alt="Company Logo" className="logo" />
        </motion.div>

        <nav className="desktop-nav">
          <motion.a
            onClick={headerclick('/')}
            className={`nav-link ${isActive('/')}`}
            variants={navLinkVariants}
            whileHover="hover"
          >
            Home
          </motion.a>
          <motion.a
            onClick={headerclick('/about')}
            className={`nav-link ${isActive('/about')}`}
            variants={navLinkVariants}
            whileHover="hover"
          >
            About Us
          </motion.a>
          <motion.a
            onClick={headerclick('/services')}
            className={`nav-link ${isActive('/services')}`}
            variants={navLinkVariants}
            whileHover="hover"
          >
            Services
          </motion.a>
          <motion.a
            onClick={headerclick('/products')}
            className={`nav-link ${isActive('/products')}`}
            variants={navLinkVariants}
            whileHover="hover"
          >
            Products
          </motion.a>
          <motion.a
            onClick={headerclick('/case')}
            className={`nav-link ${isActive('/case')}`}
            variants={navLinkVariants}
            whileHover="hover"
          >
            Case Studies
          </motion.a>
          <motion.a
            onClick={headerclick('/tnp')}
            className={`nav-link ${isActive('/tnp')}`}
            variants={navLinkVariants}
            whileHover="hover"
          >
            Training and Development
          </motion.a>
          <motion.a
            onClick={headerclick('/contact')}
            className={`nav-link ${isActive('/contact')}`}
            variants={navLinkVariants}
            whileHover="hover"
          >
            Contact Us
          </motion.a>
          <motion.a
            onClick={headerclick('/tech')}
            className={`nav-link ${isActive('/tech')}`}
            variants={navLinkVariants}
            whileHover="hover"
          >
            Technologies
          </motion.a>
        </nav>

        <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-button">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="mobile-nav"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.a
              onClick={headerclick('/')}
              className={`mobile-nav-link ${isActive('/')}`}
              variants={navLinkVariants}
              whileHover="hover"
            >
              Home
            </motion.a>
            <motion.a
              onClick={headerclick('/about')}
              className={`mobile-nav-link ${isActive('/about')}`}
              variants={navLinkVariants}
              whileHover="hover"
            >
              About Us
            </motion.a>
            <motion.a
              onClick={headerclick('/services')}
              className={`mobile-nav-link ${isActive('/services')}`}
              variants={navLinkVariants}
              whileHover="hover"
            >
              Services
            </motion.a>
            <motion.a
              onClick={headerclick('/products')}
              className={`mobile-nav-link ${isActive('/products')}`}
              variants={navLinkVariants}
              whileHover="hover"
            >
              Products
            </motion.a>
            <motion.a
              onClick={headerclick('/case')}
              className={`mobile-nav-link ${isActive('/case')}`}
              variants={navLinkVariants}
              whileHover="hover"
            >
              Case Studies
            </motion.a>
            <motion.a
              onClick={headerclick('/tnp')}
              className={`mobile-nav-link ${isActive('/tnp')}`}
              variants={navLinkVariants}
              whileHover="hover"
            >
              Training and Development
            </motion.a>
            <motion.a
              onClick={headerclick('/contact')}
              className={`mobile-nav-link ${isActive('/contact')}`}
              variants={navLinkVariants}
              whileHover="hover"
            >
              Contact Us
            </motion.a>
            <motion.a
              onClick={headerclick('/tech')}
              className={`mobile-nav-link ${isActive('/tech')}`}
              variants={navLinkVariants}
              whileHover="hover"
            >
              Technologies
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
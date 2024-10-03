import React from 'react';
import { motion } from 'framer-motion';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Phone, Mail, MapPin, Instagram, Linkedin, Facebook,Paperclip } from 'lucide-react';
import './Homepage.css';
import logo from "../../assets/logo/logo_name.png"
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate()
    const footerVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.5,
          staggerChildren: 0.1
        }
      }
    };
  
    const childVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5 }
      }
    };
  
    return (
      <motion.footer 
        className="footer"
        initial="hidden"
        animate="visible"
        variants={footerVariants}
      >
        <div className="container footer-content">
        <motion.div className="footer-section" variants={childVariants}>
            <div className="footerlogodabba">
                <img src={logo} alt="Company Logo" className="footer-logo" />
                <p>Enhance protection with cyber security, Automate with AI identity.</p>
            </div>
        </motion.div>
          
          <motion.div className="footer-section" variants={childVariants}>
            <h3>Quick Links</h3>
            <ul className="quick-links">
              <li><a onClick={()=>navigate('/')}>Home</a></li>
              <li><a onClick={()=>navigate('/about')}>About</a></li>
              <li><a onClick={()=>navigate('/services')}>Services</a></li>
              <li><a onClick={()=>navigate('/contact')}>Contact</a></li>
            </ul>
          </motion.div>
          <motion.div className="footer-section" variants={childVariants}>
            <h3>Contact Info</h3>
            <ul className="contact-info">
              <li><Phone size={18} /> <span>(123) 456-7890</span></li>
              <li><Mail size={18} /> <span>info@jaishglobal.in</span></li>
              <li><MapPin size={18} /> <span>449, 4th floor JMD Megapolis, Sector-48, Gurugram, Haryana - 122018</span></li>
            </ul>
          </motion.div>
          <motion.div className="footer-section" variants={childVariants}>
            <h3>Follow Us</h3>
            <ul className="social-icons">
              <li><a href="#"><Instagram size={24} /> <span>jaishglobal.tech</span></a></li>
              <li><a href="#"><Linkedin size={24} /> <span>jaishglobal.tech</span></a></li>
              <li><a href="#"><Facebook size={24} /> <span>jaishglobal.tech</span></a></li>
            </ul>
          </motion.div>
        </div>
        <motion.div 
          className="footer-bottom"
          variants={childVariants}
        >
          <p>&copy; 2024 Jaish Global Private Limited. All rights reserved.</p>
        </motion.div>
      </motion.footer>
    );
  };

  export default Footer
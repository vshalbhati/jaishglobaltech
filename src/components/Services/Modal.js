import React from 'react';
import { motion } from 'framer-motion';
import './Modal.css';

const Modal = ({ isOpen, onClose, service }) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="modal-content"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2>{service.title}</h2>
        <img src={service.image} alt={service.title} className="modal-image" />
        <p>{service.description}</p>
        <button className="modal-close-btn" onClick={onClose}>
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Modal;

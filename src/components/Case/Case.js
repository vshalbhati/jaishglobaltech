import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './Case.css';
import { client } from '../../sanityclient'; 
import { PortableText } from '@portabletext/react';
import { useLocation } from 'react-router-dom';

const Book = ({ study, onClick }) => (
  <motion.div
    className="book"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    <div className="book-cover">
      <p style={{"fontWeight":"bold"}}>{study.name}</p>
    </div>
  </motion.div>
);

const OpenBook = ({ study, onClose }) => {

  return (
    <motion.div
      className="open-book"
      initial={{ rotateY: 90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      exit={{ rotateY: 90, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button className="close-btn" onClick={onClose}><X /></button>
      <div className="book-content">
        <div style={{"textAlign":"left"}}>
          <h3 style={{"textAlign":"left"}}>Case Study Domain</h3>
          <p>{study.domain}</p>
        </div>
        {(study.challenge) && (
          <div style={{"textAlign":"left"}}>
            <h3 style={{"textAlign":"left"}}>Challenge</h3>
            <p >{study.challenge}</p>
          </div>
        )}
        {(study.solution) && (
          <div style={{"textAlign":"left"}}>
            <h3 style={{"textAlign":"left"}}>Solution</h3>
            <p>{study.solution}</p>
          </div>
        )}
       
        
        {(study.process) &&(
          <div style={{"textAlign":"left"}}>
            <h3 style={{"textAlign":"left"}}>Process</h3>
            <PortableText value={study.process} />
          </div>
        )}
        {(study.scope) &&(
          <div style={{"textAlign":"left"}}>
            <h3 style={{"textAlign":"left"}}>Scope</h3>
            <PortableText value={study.scope} />
          </div>
        )}
        {(study.benefits) &&(
          <div style={{"textAlign":"left"}}>
            <h3 style={{"textAlign":"left"}}>Benefits</h3>
            <PortableText value={study.benefits} />
          </div>
        )}

      </div>
    </motion.div>
  );
};

const Case = () => {

  const [openStudy, setOpenStudy] = useState(null);
  const [casestudy, setcasestudy] = useState([]);

  useEffect(() => {
    fetchcasestudy();
  }, []);

  const fetchcasestudy = async () => {
    try {
      const data = await client.fetch(`
        *[_type == "casestudy"]{
          name,
          domain,
          category,
          challenge,
          solution,
          process,
          benefits,
          scope
        }
      `);
      setcasestudy(data);
    } catch (error) {
      console.error('Error fetching casestudy:', error);
    }
  };

  const cyberCaseStudy = casestudy.filter(study => study.category === 'cyber');
  const aiCaseStudy = casestudy.filter(study => study.category === 'ai');

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);


  return (
    <div className="bookshelf">
      <div className="header-wrapper" style={{"position": "relative", "height": "50vh", "display": "flex", "justifyContent": "center", "alignItems": "center"}}>
        <img
          src={require('../../assets/imgs/case.jpg')}
          style={{"height":"45vh","width":"100vw","left":"0","position":"absolute","zIndex":"0"}}
        />
      </div>
      {/* <motion.h1 
          className="products-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{"fontSize":"3rem","marginTop":"18rem"}}
        >
          Case Studies
        </motion.h1> */}
      <div className="constiner">
        <motion.p 
          className="products-intro"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{"fontSize":"3.5rem","fontWeight":"bold","color":"#dcca00","marginBottom":"8rem","marginTop":"2rem"}}
        >
          Cyber Security
        </motion.p>
          <div className="books" style={{"display":"flex","marginTop":"-4rem","flexWrap":"wrap"}}>
            {cyberCaseStudy.map((study, index) => (
              <Book key={index} study={study} onClick={() => setOpenStudy(study)} />
            ))}
          </div>
          
      </div>
      
      <div className="constiner">
        <motion.p 
          className="products-intro"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{"fontWeight":"bold","color":"#3fa9d7","marginBottom":"8rem"}}
        >
        Artificial Intelligence and Machine Learning
        </motion.p>
        <div className="books" style={{"display":"flex","marginTop":"-4rem","flexWrap":"wrap"}}>

            {aiCaseStudy.map((study, index) => (
              <Book key={index} study={study} onClick={() => setOpenStudy(study)} />
            ))}
          </div>

      </div>
      
      <AnimatePresence>
        {openStudy && (
          <OpenBook study={openStudy} onClose={() => setOpenStudy(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Case;
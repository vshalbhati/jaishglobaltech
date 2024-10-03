import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
import './Case.css';
import { client } from '../../sanityclient'; 
import { PortableText } from '@portabletext/react';
import { useNavigate } from 'react-router-dom';

const Book = ({ study, onClick }) => (
  <motion.div
    className="book"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    <div className="book-cover">
      <p>{study.name}</p>
    </div>
  </motion.div>
);

const OpenBook = ({ study, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const pages = [
    { title: study.name, content: study.domain },
    { title: "Challenge", content: study.challenge },
    { title: "Solution", content: study.solution },
    { title: "Process", content: study.process ? <PortableText value={study.process} /> : null },
    { title: "Scope", content: study.scope ? <PortableText value={study.scope} /> : null },
    { title: "Benefits", content: study.benefits ? <PortableText value={study.benefits} /> : null }
  ].filter(page => page.content);

  const nextPage = () => {
    setDirection(1);
    setCurrentPage(prev => Math.min(prev + 1, pages.length - 1));
  };

  const prevPage = () => {
    setDirection(-1);
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

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
      {/* {pages[currentPage]?.content && (
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: direction === 1 ? 50 : -50 }}  // Slide in based on direction
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 1 ? -50 : 50 }}  // Slide out based on direction
              transition={{ duration: 0.3 }}
            >
              <h2 className="book-title">{pages[currentPage].title}</h2>
              <div className="book-page-content">
                {pages[currentPage].content}
              </div>
            </motion.div>
          </AnimatePresence>
        )} */}
        <div style={{"textAlign":"left"}}>
          <h2 >Case Study Domain</h2>
          <p>{study.domain}</p>
        </div>
        <div style={{"textAlign":"left"}}>
          <h2 >Challenge</h2>
          <p >{study.challenge}</p>
        </div>
        <div style={{"textAlign":"left"}}>
          <h2 >Solution</h2>
          <p>{study.solution}</p>
        </div>
        
        {(study.process) &&(
          <div style={{"textAlign":"left"}}>
            <h2>Process</h2>
            <PortableText value={study.process} />
          </div>
        )}
        {(study.scope) &&(
          <div style={{"textAlign":"left"}}>
            <h2>Scope</h2>
            <PortableText value={study.scope} />
          </div>
        )}
        {(study.benefits) &&(
          <div style={{"textAlign":"left"}}>
            <h2>Benefits</h2>
            <PortableText value={study.benefits} />
          </div>
        )}

      </div>
      {/* <div className="page-controls">
        <button onClick={prevPage} disabled={currentPage === 0}><ChevronLeft /></button>
        <button onClick={nextPage} disabled={currentPage === pages.length - 1}><ChevronRight /></button>
      </div> */}
    </motion.div>
  );
};

const Case = () => {
  const navigate = useNavigate();

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


  return (
    <div className="bookshelf">
      <img
        src={require('../../assets/imgs/case.jpg')}
        style={{"height":"50vh","width":"100vw","left":"0","position":"absolute","zIndex":"0"}}
      />
      <motion.h1 
          className="products-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{"fontSize":"3rem"}}
        >
          Case Studies
        </motion.h1>
      <div className="constiner">
        <motion.p 
          className="products-intro"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{"fontWeight":"bold","color":"#3fa9d7","marginBottom":"10rem"}}
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
        <div className="books" style={{"display":"flex","marginTop":"-4rem"}}>

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
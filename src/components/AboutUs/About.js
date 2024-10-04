import React, { useEffect, useState } from 'react';
import { client} from '../../sanityclient'; 
import { motion } from 'framer-motion';
import './About.css';
const AboutUs = () => {
  const [datamila, setdatamila] = useState([])

  useEffect(() => {
    fetchdata();
  }, [])

  const fetchdata = async () => {
    try {
      const data = await client.fetch(`*[_type=="about"]{
                  name, 
                  post,
                  description,
                  image{
                    asset->{url}
                  }
                }`
      );
      setdatamila(data);
      
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  return (
    <div className="container">
      <div className="imgdabba">
        <img
          src={require('../../assets/imgs/about_bg.jpg')}
          style={{"height":"50vh","width":"100vw","left":"0","position":"absolute","zIndex":"-1"}}
        />
      </div>
      
      <motion.h1 
        className="main-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{"fontSize":"3.5rem"}}
      >
        About Us
      </motion.h1>

      <motion.section 
        className="company-info"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2>Our Company</h2>
        <p>
        Established in 2019, Jaish Global has rapidly evolved into a distinguished solution provider in Cyber Security space and SI integrator in Digital Transformation using Machine Learning & Artificial Intelligence. Its umbrella company named “JS Global IT Consultancy  Services” is an ISO 9001, 27001 certified.
Our unwavering focus on quality and innovative niche technology solutions creates a true edge. Our commitment to excellence has positioned us as a trusted technology driven organization, safeguarding  customer businesses from the ever-evolving landscape of cyber threats and creating business values in customer’s enterprise portfolio using our AI tools / services.  
We never stop pushing the boundaries of what is possible. We are always learning, growing, re-skilling in Technology solution and process mapping to stay at the forefront of the industry. Our dynamic culture reflects our drive to be the best.
Our growth trajectory is fueled by our core values, including diversity, employee empowerment, and a commitment to ethical business practices.       </p>
      </motion.section>

      {datamila.map((founder, index) => (
        <motion.div 
          key={founder.name}
          className={`founder ${index % 2 === 0 ? 'even' : 'odd'}`}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
        >
          <div className="founder-image">
            <img src={founder.image.asset.url} alt={founder.name} />
          </div>
          <div className="founder-info">
            <h3>{founder.name}</h3>
            <p>{founder.post}</p>
            <p>{founder.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AboutUs;
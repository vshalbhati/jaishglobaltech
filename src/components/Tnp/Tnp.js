import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Tnp.css';
import { client } from '../../sanityclient'; 
import { useLocation } from 'react-router-dom';
const Tnp = () => {
  const trainingPrograms = [
    {
      title: "Technical Skills Bootcamp",
      duration: "8 weeks",
      description: "Intensive program covering the latest technologies and programming languages.",
      topics: ["Web Development", "Mobile App Development", "Cloud Computing", "Data Science"]
    },
    {
      title: "Soft Skills Workshop",
      duration: "4 weeks",
      description: "Enhance your professional skills to excel in the workplace.",
      topics: ["Communication", "Leadership", "Time Management", "Team Collaboration"]
    },
    {
      title: "Industry-Specific Training",
      duration: "6 weeks",
      description: "Specialized training tailored to specific industry needs and trends.",
      topics: ["FinTech", "HealthTech", "E-commerce", "Cybersecurity"]
    }
  ];
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    try {
      const query = `*[_type == "table"]{
        Title,
        header,
        row[]{
          cells[]
        }
      }`;
      const data = await client.fetch(query);
      setTableData(data);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="training-placement-container">
      <div className="header-wrapper" style={{"position": "relative", "height": "50vh", "display": "flex", "justifyContent": "center", "alignItems": "center"}}>
        <img
            src={require('../../assets/imgs/tnp_bg.jpg')}
            style={{"height":"45vh","width":"98vw","left":"0","position":"absolute","zIndex":"0"}}
            />
      </div>
      <motion.h1 
        className="main-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{"color":"#333","fontSize":"3.5rem","marginTop":"2rem"}}

      >
        Training and Development
      </motion.h1>

      <motion.p 
        className="intro-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        We are continuously striving to develop the skills and competencies of our resources in the upcoming Cyber Security tools, technologies and processes perfectly aligned with our specific skills gaps. Our Cybersecurity Training and Development centre acts as a nerve centre in our organisation to serve customer efficiently with increased productivity. All these are achieved by abiding our organizational vision and mission along with state-of-the-art technology, tools and infrastructure. We are organising the training programs through Interactive E-learning, video-based session as well as through Gamified learning. 
        We transform traditional training into dynamic E-learning experiences with our Interactive E-Learning solutions. Our expert e-learning development team crafts the learning content that ensures maximum knowledge retention to the resources.
        Embracing the power of visuals with our Video-based E-Learning program, we tailor our videos to meet the diverse needs of our organization related to Cyber Security.
        We elevate learning initiatives through our cutting-edge Gamified experiences.  Our learning development team designs interactive quests and challenges that drive learner motivation and participation. The objective of the program is to develop awareness of Cyber Security within the organization.
        We've managed and monitored a marked improvement in employee performance and transform that to a more confident workforce.
      </motion.p>
      <motion.p 
        className="intro-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        However, we are translating our Cyber Security training capabilities and experiences to LMS solutions for our customers.
      </motion.p>

      <section className="training-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{"color":"#3fa9d7","marginTop":"5rem"}}
        >
          Training Programs
        </motion.h2>
        <div className="training-grid">
          {trainingPrograms.map((program, index) => (
            <motion.div 
              key={program.title}
              className="training-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
            >
              <h3 className="program-title">{program.title}</h3>
              <p className="program-description">{program.description}</p>
              <ul className="program-topics">
                {program.topics.map((topic, topicIndex) => (
                  <motion.li 
                    key={topicIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * topicIndex + 0.5 * (index + 1) }}
                  >
                    {topic}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <div className='training-grid'>

      {tableData && tableData.length > 0 ? (
        tableData.map((table, index) => (
          <div key={index} className='training-card'>
            <h3 className="program-title">{table.Title}</h3>
            <table>
              <tbody>
                {table.row.map((rowItem, rowIndex) => (
                  <ul className="program-topics">
                    {rowItem.cells.map((cellItem, cellIndex) => (
                      <motion.li 
                        key={cellIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * cellIndex + 0.5 * (cellIndex + 1) }}
                      >
                        {cellItem}
                      </motion.li>
                    ))}
                  </ul>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>Loading table data...</p>
      )}
    </div>
    </div>
  );
};

export default Tnp;
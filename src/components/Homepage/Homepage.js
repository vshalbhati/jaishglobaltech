import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Homepage.css';
import { useNavigate, useLocation } from 'react-router-dom';
import {  ClipboardList, 
  Search, 
  Shield, 
  FileCheck, 
  LightbulbIcon, Code, Rocket, Brain, ActivityIcon} from 'lucide-react';
import { FaCheckCircle } from 'react-icons/fa';
const VideoCarousel = () => {
  const videos = [
    require("../../assets/videos/vapt.mp4"),
    require("../../assets/videos/cloud.mp4"),
    require("../../assets/videos/identity.mp4"),
    require("../../assets/videos/microsoft.mp4"),
    require("../../assets/videos/risk.mp4"),
    require("../../assets/videos/soc.mp4"),
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="video-carousel-container">
    <Carousel 
      autoPlay 
      interval={3000} 
      infiniteLoop 
      showThumbs={false}
      showStatus={false}
      stopOnHover={false}
      swipeable={true}
      emulateTouch={true}
      dynamicHeight={true}
      showArrows={!isMobile}
    >
      {videos.map((video, index) => (
        <div key={index} className="video-slide">
          <video 
            width="100%" 
            height="auto"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </Carousel>
  </div>
  );
};


const Content = () => {
  const navigate = useNavigate();

  const asescards = [
    { title: "Gather Information", description: "On your current Security Posture", icon: ClipboardList,color:'green' },
    { title: "Evaluate", description: "Your existing Cybersecurity Strategy", icon: Search,color:'blue' },
    { title: "Identify", description: "Your critical assets such as networks, systems, data", icon: Shield,color:'red' },
    { title: "Assess", description: "The overall cyber risk and security risks", icon: FileCheck,color:'orange' },
    { title: "Recommend", description: "Provide recommendations on security controls, processes, & procedures", icon: LightbulbIcon,color:'yellow' },
  ];

  const approachCards = [
    {
      title: "Discovery",
      icon: Search,
      items: [
        "Setting the stage and understanding the customer business processes",
        "Evaluate data maturity",
        "Articulate the problem statement and set out deliverables",
        "Perform feasibility analysis (may involve a few POCs)",
        "Define and apprise customer of risks involved"
      ]
    },
    {
      title: "Experiment and Execute",
      icon: Code,
      items: [
        "Check the information flow, data sources, formats, data availability and adequacy",
        "Building the data flow diagram and data preparation for model creation",
        "Model design - building test data sets",
        "Model design – apply candidate AI techniques",
        "Select the model giving the best results"
      ]
    },
    {
      title: "Implement",
      icon: Rocket,
      items: [
        "Prepare Infrastructure",
        "Implement solution",
        "Trial runs and fine tuning"
      ]
    }
  ];

  const portfolioservices = [
    {
      title: "Cybersecurity Services",
      icon: Shield,
      description: "Protect your digital assets with our comprehensive cybersecurity solutions.",
      color: "#4F46E5",
      services: ["Gap Analysis", "Microsoft 365", "IDAM", "GRC"],
      products: ["Digital Risk Monitor", "Dark Web Monitor", "Supplier Risk Monitor"]
    },
    {
      title: "Machine Learning & AI for Digital Transformation",
      icon: Brain,
      description: "Leverage the power of ML and AI to drive your digital transformation journey.",
      color: "#10B981",
      services: ["Machine Learning & Artificial Intelligence for Digital Transformation"],
      products: ["Texplicit - Intelligent Report Generator"]
    },
    {
      title: "Process Automation Built for the Modern Workforce",
      icon: ActivityIcon,
      description: "Streamline and automate processes to boost productivity and efficiency.",
      color: "orange",
      services: ["Workflow Automation", "AI-driven Process Optimization"],
      products: ["DocQ"]
    }
  ];
  

  return (
    <div>
    <section className="content-section">
      <div className="container content-container" style={{"marginTop":"3rem"}}>
        <div className="content-text">
          <h2 style={{"textAlign":"left"}}>Jaish Global Tech Private Limited</h2>
          <p>
          Established in 2019, Jaish Global Tech Pvt. Ltd has rapidly evolved into a distinguished solution provider in Cyber Security space and SI integrator in Digital Transformation using Machine Learning & Artificial Intelligence. 
          Our unwavering focus on quality and innovative niche technology solutions creates a true edge. Our commitment to excellence has positioned us as a trusted technology driven organization, safeguarding  customer businesses from the ever-evolving landscape of cyber threats and creating business values in customer’s enterprise portfolio using our AI tools / services. 
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/about')}
            style={{'width':'100px',backgroundColor:'rgba(0,0,0,0)',cursor:'pointer'}}
          >
            <img src={require('../../assets/imgs/readmore.png')} alt='learn-more-button' 
            style={{
              'width':'200px',  
            }}/>
          </motion.div>
        </div>

        <div className="content-image">
          <img src={require('../../assets/imgs/home_about_bg.jpg')} alt="Company Image" />
        </div>
      </div>
    </section>

    <section className="service-portfolio">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Service Portfolio
      </motion.h2>
      <div className="service-boxes">
        {portfolioservices.map((service, index) => (
          <motion.div
            key={index}
            className="service-box"
            style={{ backgroundColor: service.color }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <motion.div
              className="icon-wrapper"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
            <service.icon size={48} color="white" />
            </motion.div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
              <div className='dabbas'>
              <motion.div 
                className="services" 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
              >
                <p>Services</p>
                <ul>
                {service.services.map((item, serviceIndex) => (
                  <li key={serviceIndex}><FaCheckCircle /> {item}</li>
                ))}
                </ul>
              </motion.div>
              
              <motion.div 
                className="products" 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p>Products</p>
                <ul>
                {service.products.map((item, productIndex) => (
                  <li key={productIndex}><FaCheckCircle /> {item}</li>
                ))}
                </ul>
              </motion.div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/services')}
              style={{'width':'100px',backgroundColor:'rgba(0,0,0,0)',cursor:'pointer',width:'10rem',marginTop:'1rem'}}
            >
              <img src={require('../../assets/imgs/readmore.png')} alt='learn-more-button' 
              style={{
                'width':'10rem',  
              }}/>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="cybersecurity-assessment">
      <motion.h2 
        className="assessment-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Cyber Security Gap Assessment Model
      </motion.h2>
      <div className="card-container" style={{"marginTop":"3rem"}}>
        {asescards.map((card, index) => (
          <motion.div 
            key={index}
            className="assessment-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            style={{border: `0.15rem solid ${card.color}`}}
          >
            <card.icon className="card-icon" />
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
    <section className='approachdabba'>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Engagement Approach to Create AI & ML Driven Solutions
      </motion.h2>
      <div className="approachcards-container">
        {approachCards.map((card, index) => (
          <motion.div
            key={index}
            className="approachcard"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <card.icon className="card-icon" />
            <h3>{card.title}</h3>
            <ul>
              {card.items.map((item, itemIndex) => (
                <motion.li
                  key={itemIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: (index * 0.1) + (itemIndex * 0.05) }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
    </div>
  );
};

const Homepage = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className="homepage">
      <main>
        <VideoCarousel />
        <Content />
      </main>
    </div>
  );
};

export default Homepage;
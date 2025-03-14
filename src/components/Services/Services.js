import React, { useEffect, useState } from 'react';
import { client } from '../../sanityclient'; 
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './Services.css';
import { PortableText } from '@portabletext/react';
import { useNavigate, useLocation } from 'react-router-dom';

const ServiceCard = ({ name, short_description, image, onLearnMore, categ, imagis }) => (
  <motion.div 
    className="service-card"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    {/* {image && image.asset && image.asset.url ? (
      <img src={image.asset.url} alt={name} className="service-image" />
    ) : (
      <div className="service-image-placeholder">No Image Available</div>
    )}
     */}
    <h3>{name}</h3>
    <p>{short_description}</p>
    {(categ ==='ai') && (
      <div className="imgs">
        <img src={imagis[0].asset.url} alt='AI and ML Image 1'/>
        <img src={imagis[1].asset.url} alt='AI and ML Image 2'/>
      </div>
    )}
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onLearnMore}
      style={{'width':'100px',backgroundColor:'rgba(0,0,0,0)',cursor:'pointer',width:'11rem',marginTop:'1rem'}}
    >
      <img src={require('../../assets/imgs/readmore.png')} alt='learn-more-button' style={{'width':'11rem',}}/>
    </motion.div>
  </motion.div>
);

const Modal = ({ isOpen, onClose, service }) => {
  if (!isOpen || !service) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* {service.image && service.image.asset && service.image.asset.url ? (
          <img src={service.image.asset.url} alt={service.name} className="modal-image" />
        ) : (
          <div className="modal-image-placeholder">No Image Available</div>
        )}      */}
        <h2>{service.name}</h2>   
        <p>{service.short_description}</p>
        <h3>Description</h3>
        {service.description ? (
          <PortableText
            value={service.description}
            components={{
              block: {
                normal: ({children}) => <p className="my-2">{children}</p>,
              },
              list: {
                bullet: ({children}) => <ul className="list-disc pl-5 my-2">{children}</ul>,
                number: ({children}) => <ol className="list-decimal pl-5 my-2">{children}</ol>,
              },
              listItem: {
                bullet: ({children}) => <li className="my-1">{children}</li>,
                number: ({children}) => <li className="my-1">{children}</li>,
              },
            }}
          />
        ) : (
          <p>No detailed description available.</p>
        )}
        {(service.images)?(
          <div style={{"display":"flex","gap":"30px"}}>
            {service.images.map((imaag) => (
              <img
                src={imaag.asset.url}
                style={{"height":"450px","width":"100%"}}
              />
            ))}
          </div>
        ):(
          <p></p>
        )
        }
    <motion.button 
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClose} className="close-modal-btn">
        Close
    </motion.button>
      </div>
    </div>
  );
};

const Services = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const fetchServices = async () => {
    try {
      const data = await client.fetch(`
        *[_type == "services"]{
          name,
          short_description,
          description,
          image {
            asset->{
              url
            }
          },
          category,
          images[]{
            asset->{
              url
            }
          }
        }
      `);
      const desiredOrder = ["Gap Analysis including VAPT", "Microsoft 365", "Identity and Access Management ( IDAM)","Governance Risk and Compliance ( GRC)","Security Operation Center","Network Service Security","Learning Management System ( LMS)","Cloud Security"];

      const sortedData = data.sort((a, b) => {
        const indexA = desiredOrder.indexOf(a.name);
        const indexB = desiredOrder.indexOf(b.name);
        
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }
        
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        
        return 0;
      });
      setServices(sortedData);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const cyberServices = services.filter(service => service.category === 'cyber');
  const aiServices = services.filter(service => service.category === 'ai');
  const softServices = services.filter(service => service.category === 'software');
  const serviceschotadabba=[
    {name: "Cyber Security Gap Assessment / Analysis, VAPT", color: "purple"},
    {name: "Microsoft 365 implementation(Azure AD, E3, E5)", color: "blue"},
    {name: "Identity and Access Management Services", color: "green"},
    {name: "Governance, Risk Management & Compliance Services", color: "orange"},
  ];
  const anotherdabba =[
    {name: "SOC", color: "purple"},
    {name: "DevSecOps", color: "blue"},
    {name: "CI/CD Security", color: "green"},
    {name: "Cloud Security", color: "orange"},
    {name: "Data Security", color: "red"},
  ];
  return (
    <div className="services-container">
      <div className="header-wrapper" style={{"position": "relative", "height": "50vh", "display": "flex", "justifyContent": "center", "alignItems": "center"}}>
        <img
          src={require('../../assets/imgs/services_bg.jpg')}
          style={{"height":"100%","width":"100%","left":"0","position":"absolute","zIndex":"-1"}}
        />
      </div>
      <motion.h1 
        className="services-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{"fontSize":"3.5rem",marginTop:"0rem"}}

      >
        Our Services
      </motion.h1>
        <motion.p 
          className="services-subtitle"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{marginTop:"2rem"}}
        >
          Cyber Security
        </motion.p>

      <div className="services-grid" style={{ display: 'block' }}>
  {/* upardabba */}
  <div className="upardabba" style={{ 
    display: 'flex', 
    flexWrap: 'wrap', 
    gap: '1.5rem', 
    width: '60%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: '0 auto',
    boxShadow: "0 0 1px rgba(0,0,0,0.5)",
    padding: "30px",
    borderRadius: "30px",
    maxWidth: '1200px' ,
    backgroundColor: "rgba(255, 255, 255,0.3)"

  }}>
    {serviceschotadabba.map((service, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="service-card"
        style={{
          borderRadius: "20px",
          width: "100%", 
          maxWidth: "15rem", 
          height: "5rem",
          flex: "1 1 15rem",
          backgroundColor: "rgba(238, 355, 255,0.8)",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",

        }}
      >
        <p style={{fontWeight:"bold"}}>{service.name}</p>
      </motion.div>
    ))}
  </div>

  <div className="gapdabba" style={{ height: "2rem" }}></div>

  {/* nichedabba */}
  <div className='nichedabba' style={{
    display: 'flex',
    gap: "80px",
    padding: "2rem",
    borderRadius: "20px",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    marginTop: "3rem",
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: '0 auto',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    backgroundColor: "rgba(255, 255, 255,0.3)"

  }}>
    {anotherdabba.map((service, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="service-card"
        style={{
          border: `2px solid blue`,
          borderRadius: "20px",
          width: "100%",
          maxWidth: "5rem",
          height: "3rem",
          textAlign: 'center',
          flex: "1 1 5rem",
          backgroundColor: "rgba(238, 255, 255,0.8)"

        }}
      >
        <p style={{fontWeight:"bold"}}>{service.name}</p>
      </motion.div>
    ))}
  </div>
</div>

      
      
      <div className="services-grid">
        {(cyberServices.length>0)?(
          cyberServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ServiceCard
                name={service.name}
                short_description={service.short_description}
                image={service.image}
                onLearnMore={() => openModal(service)}
              />
            </motion.div>
          ))
        ):(
          <p>Can't load Services. Please check your connectivity.</p>
        )}
        
      </div>

      <motion.p 
        className="services-subtitle"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Machine Learning & Artificial Intelligence
      </motion.p>
      <div className="services-grid">
        {(aiServices.length>0)?(
            aiServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceCard
                  short_description={service.short_description}
                  image={service.image}
                  onLearnMore={() => openModal(service)}
                  categ= {service.category}
                  imagis={service.images}
                />
                
              </motion.div>
            ))
        ):(
          <p>Can't load Services. Please check your connectivity.</p>
        )}
        
      </div>

      <motion.p 
        className="services-subtitle"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Software Development
      </motion.p>
      <div className="services-grid">
        {(softServices.length>0)?(
          softServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ServiceCard
                name={service.name}
                short_description={service.short_description}
                image={service.image}
                onLearnMore={() => openModal(service)}
              />
            </motion.div>
          ))
        ):(
          <p>Can't load Services. Please check your connectivity.</p>
        )}
        
      </div>

      <motion.div 
        className="cta-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2>Ready to elevate your business?</h2>
        <motion.button 
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={()=>navigate('/contact')}
        >
          Get Started
        </motion.button>
      </motion.div>
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        service={selectedService} 
      />
    </div>
  );
};

export default Services;
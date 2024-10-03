import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { client } from '../../sanityclient'; 
import { PortableText } from '@portabletext/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Products.css'
const ProductCard = ({ name, short_description, image, onLearnMore,features }) => (
  <motion.div 
    className="service-card"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    {/* {image && image.asset && image.asset.url ? (
      <img src={image.asset.url} alt={name} className="service-image" />
    ) : (
      <div className="service-image-placeholder">No Image Available</div>
    )}     */}
    <h3>{name}</h3>
    <p>{short_description}</p>
    <ul className="product-features">
      {(features)?(
        features.map((feature, featureIndex) => (
          <motion.li 
            key={featureIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * featureIndex + 0.5 * (featureIndex + 1) }}
          >
            {feature}
          </motion.li>
        ))
      ):(
        <p>No features available</p>
      )}
      
    </ul>
    <motion.button 
      className="learn-more-btn"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onLearnMore}
    >
      Learn More <ArrowRight size={16} />
    </motion.button>
  </motion.div>
);

const Modal = ({ isOpen, onClose, service }) => {
  if (!isOpen || !service) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {service.image && service.image.asset && service.image.asset.url ? (
          <img src={service.image.asset.url} alt={service.name} className="modal-image" />
        ) : (
          <div className="modal-image-placeholder">No Image Available</div>
        )}     
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

const Products = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await client.fetch(`
        *[_type == "products"]{
          name,
          short_description,
          features,
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
      setServices(data);
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

  return (
    <div className="products-container">
      
      <img
        src={require('../../assets/imgs/product_bg.jpg')}
        style={{"height":"50vh","width":"100vw","left":"0","position":"absolute","zIndex":"-1"}}
      />
      
      <motion.h1 
        className="products-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Cyber Security
      </motion.h1>

      <motion.p 
        className="products-intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{"marginTop":"5rem",    "color": "#3fa9d7","fontWeight": "bold"
        }}
      >
        Discover our range of innovative products related to cyber security designed to transform your business and enhance your productivity.
      </motion.p>

      <div className="products-grid">

{(cyberServices.length>0)?(
  cyberServices.map((service, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <ProductCard
        name={service.name}
        short_description={service.short_description}
        image={service.image}
        features={service.features}
        onLearnMore={() => openModal(service)}
      />
    </motion.div>
  ))
):(
  <p>Can't load Services. Please check your connectivity.</p>
)}
</div>

<motion.h1 
        className="products-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Artificial Intelligence and Machine Learning
      </motion.h1>

      <div className="products-grid">

        {(aiServices.length>0)?(
          aiServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard
                name={service.name}
                short_description={service.short_description}
                image={service.image}
                features={service.features}
                onLearnMore={() => openModal(service)}
              />
            </motion.div>
          ))
        ):(
          <p>Can't load Services. Please check your connectivity.</p>
        )}
      </div>
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        service={selectedService} 
      />
    </div>
  );
};

export default Products;
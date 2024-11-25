import React, {useState, useEffect} from 'react';
import './Tech.css';
import { motion } from 'framer-motion';
import { client } from '../../sanityclient'; 
import { useLocation } from 'react-router-dom';
import { PortableText } from '@portabletext/react';

const Tech = () => {
    const [technologies, setTechnologies] = useState([])

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const fetchTechnologies = async () => {
    try {
      const data = await client.fetch(`
        *[_type == "technologies"]{
          name,
          description,
          image {
            asset->{
              url
            }
          },
          category,
          konsicategory
        }
      `);
      setTechnologies(data);
    } catch (error) {
        console.error('Error fetching Technologies:', error);
      }
    };

    const cyberTechnologies = technologies.filter(technology => technology.konsicategory === 'cyber');
    const aiTechnologies = technologies.filter(technology => technology.konsicategory === 'ai');

  return (
    <div className="tech-container">
        <div className="header-wrapper" style={{"position": "relative", "height": "50vh", "display": "flex", "justifyContent": "center", "alignItems": "center"}}>
            <img
            src={require('../../assets/imgs/tech_bg.jpg')}
            style={{"height":"100%","width":"100%","left":"0","position":"absolute","zIndex":"1"}}
            alt="Our-Technologies_Banner"
            />
        </div>
      <div className="tech-wrapper">
      <motion.h1 
        className="services-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{"fontSize":"3.5rem",marginTop:"0rem", textAlign:'center'}}

      >   Our Technologies
      </motion.h1> 
        <motion.p 
          className="services-subtitle"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{marginTop:"2rem", textAlign:'center'}}
        >
          Cyber Security
        </motion.p>
        <div className="tech-grid">
          {cyberTechnologies.map((tech, index) => (
            // <div key={index} className="tech-card">
            //   <div className="tech-card-content">
            //   {(tech.image) && (
            //         <img src={tech.image.asset.url} alt={tech.name} style={{maxHeight:'100px',width:'100px'}}/>
            //     )}
            //     <h3 className="tech-name">{tech.name}</h3>
            //     <PortableText
            //         value={tech.description}
            //         className="tech-description"
            //         components={{
            //         block: {
            //             normal: ({children}) => <p className="my-2">{children}</p>,
            //         },
            //         list: {
            //             bullet: ({children}) => <ul className="list-disc pl-5 my-2">{children}</ul>,
            //             number: ({children}) => <ol className="list-decimal pl-5 my-2">{children}</ol>,
            //         },
            //         listItem: {
            //             bullet: ({children}) => <li className="my-1">{children}</li>,
            //             number: ({children}) => <li className="my-1">{children}</li>,
            //         },
            //         }}
            //     />
            //     <span className="tech-category">{tech.category}</span>
            //   </div>
            // </div>
            <div key={index} className="tech-card">
  <div className="tech-card-content">
    {tech.image && (
      <div className="tech-image-container">
        <img 
          src={tech.image.asset.url} 
          alt={tech.name}
          loading="lazy"  // Add lazy loading for better performance
        />
      </div>
    )}
    <h3 className="tech-name">{tech.name}</h3>
    <PortableText
      value={tech.description}
      className="tech-description"
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
    <span className="tech-category">{tech.category}</span>
  </div>
</div>
          ))}
        </div>
        
        <motion.p 
          className="services-subtitle"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{marginTop:"2rem", textAlign:'center'}}
        >
          Machine Learning & Artificial Intelligence
        </motion.p>
        <div className="tech-grid">
          {aiTechnologies.map((tech, index) => (
            <div key={index} className="tech-card">
              <div className="tech-card-content">
                {(tech.image) && (
                    <img src={tech.image.asset.url} alt={tech.name} style={{height:'200px'}}/>
                )}
                <h3 className="tech-name">{tech.name}</h3>
                <PortableText
                    value={tech.description}
                    className="tech-description"
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
                <span className="tech-category">{tech.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Tech;
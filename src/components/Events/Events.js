import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Events.css';
import { client } from '../../sanityclient'; 

const ProductCard = ({ name, date, short_description, image,keypoints }) => (
  <motion.div 
    className="service-card"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    {image && image.asset && image.asset.url ? (
      <img src={image.asset.url} alt={name} className="service-image" />
    ) : (
      <div className="service-image-placeholder">No Image Available</div>
    )}    
    <h3>{name}</h3>
    <p>{short_description}</p>
    <p>{date}</p>
    <ul className="product-features">
      {(keypoints)?(
        keypoints.map((feature, featureIndex) => (
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
        <div className="txt" 
          style={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            textAlign: 'center', 
            height: '100%' 
            }}>
          <p>No keypoints available</p>
        </div>
      )}
      
    </ul>
  </motion.div>
);

const Events = () => {
  const [events, setEvents] = useState([]);

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const fetchdata = async()=>{
    try{
    const data = await client.fetch(`
      *[_type == "events"]{
         _id,
          name,
          date,
          short_description,
          keypoints,
          description,
          image {
            asset->{
              url
            }
          },
          images[]{
            asset->{
              url
            }
          }}
      `)
      setEvents(data)
    }
    catch(error){
      console.error('Yr error aa rha hai ', error)
    }
  }

  useEffect(() => {
    fetchdata()
  })
  

  const filteredEvents = events.filter(event => {
    if (fromDate && event.date < fromDate) return false;
    if (toDate && event.date > toDate) return false;
    return true;
  });

  return (
    <div className="events-page">
      <h1>Company Events</h1>
      <div className="filter-section">
        <p>From: </p>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          placeholder="From Date"
        />
        <p>To: </p>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          placeholder="To Date"
        />
      </div>
      {(filteredEvents.length>0)?(
        <motion.div
          className="events-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredEvents.map(event => (
            <ProductCard 
              key={event._id} 
              name={event.name}
              date={event.date}
              short_description={event.short_description}
              image={event.image}
              keypoints={event.keypoints} 
            />
          ))}
        </motion.div>
      ):(
        <p style={{textAlign:'center'}}>No events found for this date!</p>
      )}  
    </div>
  );
};

export default Events;
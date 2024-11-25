import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {File, Paperclip } from 'lucide-react';
import '../Homepage/Homepage.css';
import axios from 'axios';
import {Phone, Mail } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Googlemap from '../Homepage/Googlemap'; 

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        surname:'',
        email: '',
        cont: '',
        org: '',
        msg: '',
        sub:'',
        loc:''
      });
      const [fileName, setFileName] = useState('');
      const [file, setFile] = useState(null);
      const [sending, setSending] = useState(false);
      const [result, setResult] = useState(null);
      const [remchar, setremchar] = useState(1500)
      const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
          ...prevData,
          [id]: value
        }));
    
        if (id === 'msg') {
          setremchar(1500 - value.length); 
        }
      };
    
      const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
          const selectedFile = event.target.files[0];
          setFileName(selectedFile.name);
          setFile(selectedFile);
        } else {
          setFileName('');
          setFile(null);
        }
      };
    
      const sendEmail = async (e) => {
        e.preventDefault();
        setSending(true);
        setResult(null);

        try {
            let fileData = null;
            if (file) {
                fileData = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        resolve({
                            name: file.name,
                            type: file.type,
                            data: event.target.result.split(',')[1] // Get base64 data
                        });
                    };
                    reader.onerror = (error) => reject(error);
                    reader.readAsDataURL(file);
                });
            }

            const dataToSend = {
                ...formData,
                attach: fileData
            };
            const response = await axios.post('https://us-central1-jaishglobaltech.cloudfunctions.net/api/send-email', dataToSend);
            console.log(dataToSend)

            setResult({ success: true, message: 'Email sent successfully!' });
        } catch (error) {
            console.error('Error sending email:', error.response ? error.response.data : error);
            setResult({ success: false, message: 'Failed to send email. Please try again.' });
        } finally {
            setSending(false);
        }
    };

      const [isopen, setisopen] = useState(false)
      
      const location = useLocation();

      useEffect(() => {
        window.scrollTo(0, 0);
      }, [location]);

      const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5 }
        }
      };

      return (
      <section className="contact-form-section">
        <div className="header-wrapper" style={{"position": "relative", "height": "50vh", "display": "flex", "justifyContent": "center", "alignItems": "center"}}>
          <img
            src={require('../../assets/imgs/contact_bg.jpg')}
            style={{"height":"50vh","width":"100vw","left":"0","position":"absolute","zIndex":"0"}}
          />
        </div>
      <motion.h1 
        className="products-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{"fontSize":"3rem","marginTop":"2rem"}}
      >
        Contact Us
      </motion.h1>
      <div className="container" style={{"marginTop":"0px"}}>
        <div className="contact-info" style={{"marginLeft":"1rem"}}>
          <h2 style={{"color":"black"}}>Take the first step to success with Jaish Global Tech Pvt. Ltd.</h2>
          <p>Have any question?</p>
          <div className="contact-details">
            <p><Phone size={18} /> +91-9205760111, +91-9205760444, +91-124-4461181</p>
            <p><Mail size={18} /> info@jaishglobaltech.com</p>
          </div>
          <h3>Addresses</h3>
          <h4><MapPin size={18} /> India</h4>
            <p>&#8226; 449, JMD Megapolis IT Park, Sohna Rd, Sector 48, Gurugram, Haryana, 122018</p>
            <p>&#8226; C-117, Sector 3, Tirkha Colony, Ballabgarh Faridabad, Haryana – 121004</p>
            <p>&#8226; Plot No. 4/1, Survey No. 64, Huda Techno Enclave, Madhapur, HITEC City, Hyderabad, Telangana 500082</p>
          <h4><MapPin size={18} /> UK</h4>
            <p>New Broad Street House, 35 New Broad Street, London, EC2M 1 NH</p>
          <h4><MapPin size={18} /> NETHERLAND</h4>
            <p>B.V. John M. Keynesplein 10 1066 EP AMSTERDAM</p>
          <h4><MapPin size={18} /> SPAIN</h4>
            <p>Insight Connect Spain SL, Villalar, 7BJIZQ-28001,Madrid, Spain</p>
          <h4><MapPin size={18} /> Dubai</h4>
            <p>L.L.C. B-04, ARB BLOCK-COMMERCIAL, AL BARSHA FIRST DUBAI-UAE, PO BOX: 88285</p>
        </div>
        <form className="contact-form" onSubmit={sendEmail}>
        <div style={{"display":"flex","gap":"50px"}}>
                  <div className="form-group">
                   <label htmlFor="name">Fist Name *</label>
                     <input type="text" id="name" required value={formData.name} onChange={handleInputChange} />
                 </div>
                 <div className="form-group">
                     <label htmlFor="name">Last Name</label>
                     <input type="text" id="surname" value={formData.surname} onChange={handleInputChange} />
                 </div>
                 </div>
              
               <div className="form-group">
                 <label htmlFor="email">Email *</label>
                 <input type="email" id="email" required value={formData.email} onChange={handleInputChange} />
               </div>
               <div className="form-group">
                 <label htmlFor="contact">Contact Number *</label>
                 <input type="tel" id="cont" required value={formData.cont} onChange={handleInputChange} />
               </div>
               <div className="form-group">
                 <label htmlFor="contact">Subject *</label>
                 <input type="text" id="sub" required value={formData.sub} onChange={handleInputChange} />
               </div>
               <div className="form-group">
                 <label htmlFor="organization">Organization</label>
                 <input type="text" id="org" value={formData.org} onChange={handleInputChange} />
               </div>
               <div className="form-group">
                 <label htmlFor="organization">Location</label>
                 <input type="text" id="loc" value={formData.loc} onChange={handleInputChange} />
               </div>
               <div className="form-group">
                 <label htmlFor="message">Message *</label>
                 <textarea id="msg" rows="4" required value={formData.msg} onChange={handleInputChange}></textarea>
                 <text>{remchar} characters remaining</text>
               </div>
               {(isopen)?(
                 <div className="form-group">
                     <label htmlFor="document" className="file-upload-label">
                     <Paperclip size={18} />
                     <span>{fileName || 'Attach Document'}</span>
                     <input
                         type="file"
                         id="document"
                         onChange={handleFileChange}
                         accept=".pdf,.doc,.docx,.txt"
                     />
                     </label>
                 </div>
               ):(
                //  <button onClick={()=>setisopen(true)} className='uploadbtn'><File/> Upload</button>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={()=>setisopen(true)}
                  style={{'width':'100px',backgroundColor:'rgba(0,0,0,0)',cursor:'pointer',width:'11rem',marginTop:'1rem'}}
                >
                  <img src={require('../../assets/imgs/upload.png')} alt='learn-more-button' 
                  style={{
                    'width':'11rem',  
                  }}/>
                </motion.div>
               )
               }
              
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="submit-button"
                 type="submit"
                 disabled={sending}
               >
                 {sending ? 'Sending...' : 'Send Message'}
               </motion.button>
               {result && (
                 <p className={result.success ? 'success-message' : 'error-message'}>
                   {result.message}
                 </p>
               )}
            </form>
      </div>

      <div className="googlemap">
        <motion.div variants={childVariants} className="google-map-container">
          <Googlemap />
        </motion.div>
      </div>
    </section>
  );
}

export default Contact
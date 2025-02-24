// import React from 'react'
// import Homepage from './Homepage/Homepage'
// import About from './AboutUs/About';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Header from './Homepage/Header';
// import Services from './Services/Services';
// import Contact from './Contact/Contact';
// import Products from './Products/Products';
// import Tnp from './Tnp/Tnp';
// import Case from './Case/Case';
// import Footer from './Homepage/Footer';
// // import Events from './Events/Events';
// import Tech from './Tech/Tech';
// function Routing() {

//   return (
//     <Router>
//     <Header/>
//       <Routes>
//         <Route path="/" element={<Homepage/>} />
//         <Route path="/about" element={<About/>} />
//         <Route path='/services' element={<Services/>}/>
//         <Route path='/contact' element={<Contact/>}/>
//         <Route path='/products' element={<Products/>}/>
//         <Route path='/tnp' element={<Tnp/>}/>
//         <Route path='/case' element={<Case/>}/>
//         <Route path='/tech' element={<Tech/>}/>

//         {/* <Route path='/events' element={<Events/>}/> */}

//         <Route path="*" element={<Navigate to="/" replace />} />

//       </Routes>
//       <Footer/>
//     </Router>
//   )
// }

// export default Routing

import React, { useState, useEffect } from 'react';
import Homepage from './Homepage/Homepage';
import About from './AboutUs/About';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Homepage/Header';
import Services from './Services/Services';
import Contact from './Contact/Contact';
import Products from './Products/Products';
import Tnp from './Tnp/Tnp';
import Case from './Case/Case';
import Footer from './Homepage/Footer';
// import Events from './Events/Events';
import Tech from './Tech/Tech';
import LoadingVideo from '../assets/videos/jaish_global.mp4'; // Import your loading video
import './Routing.css'; // Import the CSS file

function Routing() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
  }, []);

  return (
    <Router>
      {loading ? (
        <div className="loading-container">
          <video src={LoadingVideo} autoPlay muted onEnded={() => setLoading(false)} className="loading-video" />
        </div>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path='/services' element={<Services />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/products' element={<Products />} />
            <Route path='/tnp' element={<Tnp />} />
            <Route path='/case' element={<Case />} />
            <Route path='/tech' element={<Tech />} />
            {/* <Route path='/events' element={<Events/>}/> */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
}

export default Routing;
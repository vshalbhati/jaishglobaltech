import React from 'react'
import Homepage from './Homepage/Homepage'
import About from './AboutUs/About';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Homepage/Header';
import Services from './Services/Services';
import Contact from './Contact/Contact';
import Products from './Products/Products';
import Tnp from './Tnp/Tnp';
import Case from './Case/Case';
import Footer from './Homepage/Footer';
function Routing() {
  return (
    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/about" element={<About/>} />
        <Route path='/services' element={<Services/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/tnp' element={<Tnp/>}/>
        <Route path='/case' element={<Case/>}/>

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
      <Footer/>
    </Router>
  )
}

export default Routing
import React from 'react';
import { useEffect, useRef } from 'react';

const Googlemap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD4s-Gwy_rxiKDhIDg-rOISp4AJAqOgU94&libraries=places`;
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener('load', () => {
      const geocoder = new window.google.maps.Geocoder();
      const address = "449, 4th floor JMD Megapolis, Sector-48, Gurugram, Haryana - 122018";

      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          const map = new window.google.maps.Map(mapRef.current, {
            center: results[0].geometry.location,
            zoom: 15,
            styles: [
              {
                featureType: 'all',
                elementType: 'geometry',
                stylers: [{ color: '#242f3e' }]
              },
              {
                featureType: 'all',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#212f3e' }]
              },
              {
                featureType: 'all',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#746855' }]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#17263c' }]
              }
            ]
          });

          const marker = new window.google.maps.Marker({
            map,
            position: results[0].geometry.location,
            animation: window.google.maps.Animation.DROP,
            title: 'Jaish Global Private Limited'
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: '<div style="color: black;"><strong>Jaish Global Private Limited</strong><br>449, 4th floor JMD Megapolis,<br>Sector-48, Gurugram,<br>Haryana - 122018</div>'
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        } else {
          console.error('Geocode was not successful for the following reason: ' + status);
        }
      });
    });
  }, []);

  return (
    <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
  );
};

export default Googlemap;
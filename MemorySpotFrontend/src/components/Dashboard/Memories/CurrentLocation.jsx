// // Not using this code though

// import React, { useState, useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';

// mapboxgl.accessToken =
//   'pk.eyJ1IjoibHluZGVua2lkZCIsImEiOiJjbGR0OWM3eGwyM3hqM3BxdWV4MHdkbWthIn0.QDkKI9r49hYmAfavmj5n9g';

// const Location = ({ latitude, longitude, setLatitude, setLongitude }) => {
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(function (position) {
//       setLongitude(position.coords.longitude);
//       setLatitude(position.coords.latitude);

//       console.log('Printing the longitude: ', position.coords.longitude);
//       console.log('Printing the latitude: ', position.coords.latitude);
//     });
//   }, []);

//   return (
//     <div>
//       <p>Longitude: {longitude === '' ? 'Calculating longitude' : longitude}</p>
//       <p>Latitude: {latitude === '' ? 'Calculating latitude' : latitude}</p>
//     </div>
//   );
// };

// export default Location;

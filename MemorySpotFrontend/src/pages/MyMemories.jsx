import React, { useState, useEffect } from 'react';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { memories } from '../services/tempData.js';
import MyMemory from '../components/MyMemories/MyMemory';
import mapboxgl from 'mapbox-gl'; // import Mapbox GL JS library
import 'mapbox-gl/dist/mapbox-gl.css';
import { useDispatch, useSelector } from 'react-redux';
import { actionFtHUserMemories } from '../redux/actions/memoryActions.js';

const MyMemories = () => {
  const { mymemories } = useSelector(state => state.memory);
  const { homeUser } = useSelector(state => state.auth);
  const [map, setMap] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (homeUser !== null) {
      fetchHomeUserMemories();
    }
  }, [homeUser]);

  const fetchHomeUserMemories = async () => {
    await actionFtHUserMemories(homeUser._id, dispatch);
  };

  useEffect(() => {
    // Initialize Mapbox GL JS map
    mapboxgl.accessToken =
      'pk.eyJ1IjoibHluZGVua2lkZCIsImEiOiJjbGR0OWM3eGwyM3hqM3BxdWV4MHdkbWthIn0.QDkKI9r49hYmAfavmj5n9g'; // Replace with your Mapbox access token
    const newMap = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-114.1677107, 51.0772544],
      zoom: 12,
    });

    setMap(newMap);

    // Add a marker at each memory's location
    mymemories.forEach((memory, index) => {
      const marker = new mapboxgl.Marker({ color: '#f90' }); // Set the marker color to orange
      marker.setLngLat([memory.longitude, memory.latitude]).addTo(newMap);

      // Add a click event listener to the markers to open a popup with memory's title and description
      marker.getElement().addEventListener('click', () => {
        const popup = new mapboxgl.Popup({ offset: 25 });
        popup
          .setLngLat([memory.longitude, memory.latitude])
          .setHTML(`<h3>${memory.title}</h3><p>${memory.caption}</p>`)
          .addTo(newMap);
      });
    });

    newMap.on('mouseenter', 'marker', () => {
      newMap.getCanvas().style.cursor = 'pointer';
    });

    newMap.on('mouseleave', 'marker', () => {
      newMap.getCanvas().style.cursor = '';
    });

    return () => {
      newMap.remove();
    };
  }, []);

  return (
    <Box p={12}>
      <Heading as="h1" textAlign="center" mb={4}>
        Your memories
      </Heading>
      <Box id="map" style={{ width: '100%', height: '400px' }} />
      <SimpleGrid columns={[1, 2, 3]} spacing={8} padding={'1rem'}>
        {mymemories.length === 0 ? (
          <Heading textAlign={'center'} fontSize={'md'}>
            You haven't uploaded any memories
          </Heading>
        ) : (
          mymemories.map((memory, index) => (
            <MyMemory
              key={index}
              _id={memory._id}
              title={memory.title}
              caption={memory.caption}
              address={'Random address'}
              longitude={memory.longitude}
              latitude={memory.latitude}
              memoryRadius={memory.memoryRadius}
              owner={memory.owner[0].name}
              datePosted={memory.uploadedDate}
            />
          ))
        )}
      </SimpleGrid>
    </Box>
  );
};

export default MyMemories;

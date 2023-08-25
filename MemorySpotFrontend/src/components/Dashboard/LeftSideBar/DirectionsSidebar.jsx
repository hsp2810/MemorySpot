import { Box, Button, HStack, Heading, Text, VStack } from '@chakra-ui/react';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const DirectionSidebar = ({ map, setShowDirectionsSidebar, memory }) => {
  const sidebarRef = useRef(null);
  const { userLongitude, userLatitude } = useSelector(state => state.map);

  useEffect(() => {
    if (!sidebarRef.current) return;

    console.log('Directions: User Location: ', userLongitude, userLatitude);
    console.log(
      `Directions: Memory Location of ${memory.title}: `,
      memory.longitude,
      memory.latitude
    );

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      flyTo: false,
      fitBounds: false,
      alternatives: true,
      geometries: 'geojson',
      controls: {
        instructions: true,
        profileSwitcher: true,
        inputClasses: {
          origin: 'visually-hidden',
          destination: 'visually-hidden',
        },
        // inputs: false, Removes both the inputs and the travel modes
      },
      interactive: false,
      style: () => {
        return {
          classes: ['my-directions-style'],
        };
      },
    });

    directions.setOrigin([userLongitude, userLatitude]);
    directions.setDestination([memory.longitude, memory.latitude]);

    directions.on('render', () => {
      const directionsContainer = document.querySelector(
        '.mapbox-directions-step-instructions'
      );
      const lastDirection = directionsContainer.lastChild;

      if (lastDirection) {
        const distanceElement = lastDirection.querySelector(
          '.mapbox-directions-step-distance'
        );
        const timeElement = lastDirection.querySelector(
          '.mapbox-directions-step-duration'
        );

        if (distanceElement && timeElement) {
          const distance = distanceElement.textContent.trim();
          const time = timeElement.textContent.trim();

          distanceElement.textContent = `Total distance: ${distance}`;
          timeElement.textContent = `Travel time: ${time}`;
        }
      }
    });

    sidebarRef.current.innerHTML = '';
    sidebarRef.current.appendChild(directions.onAdd(map));
  }, [memory]);

  return (
    <>
      <VStack height={'85vh'} w={'20vw'} alignItems={'center'}>
        <HStack>
          <Heading textAlign={'center'} fontSize={'md'}>
            Showing directions for {memory.title}
          </Heading>
          <Button onClick={() => setShowDirectionsSidebar(false)}>
            <span className="material-symbols-outlined">visibility_off</span>
          </Button>
        </HStack>
        <Box
          bg="white"
          height="calc(100vh - 60px)"
          boxShadow="md"
          overflowY="auto"
          p={4}
          ref={sidebarRef}
        >
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Directions to Memory
          </Text>
        </Box>
      </VStack>
    </>
  );
};

export default DirectionSidebar;

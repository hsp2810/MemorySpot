import React, { useEffect, useState } from 'react';
import {
  Button,
  Divider,
  HStack,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import '../../assets/css/map/markerpopup.css';
import mapboxgl from 'mapbox-gl';
import '../../assets/css/directions.css';
import { useSelector } from 'react-redux';

const MarkerPopupContent = ({
  memory,
  userLongitude,
  userLatitude,
  setShowDirectionsSidebar,
  setDirectionCredentials,
  homeUser,
}) => {
  const [isLocked, setIsLocked] = useState(true);

  const calcDistanceBwUserAndMemory = () => {
    const userLocation = new mapboxgl.LngLat(userLongitude, userLatitude);
    const memoryLocation = new mapboxgl.LngLat(
      memory.longitude,
      memory.latitude
    );
    console.log(
      'Printing the user location when calculating the distance: ',
      userLocation
    );
    console.log(
      'Printing the memory location when calculating the distance: ',
      memoryLocation
    );
    const distance = userLocation.distanceTo(memoryLocation);
    return distance / 1000;
  };

  useEffect(() => {
    const distance = calcDistanceBwUserAndMemory();
    console.log(`Printing the distance of memory ${memory.title}: `, distance);
    if (distance <= memory.memoryRadius || homeUser.isAdmin) {
      setIsLocked(false);
    }
  });

  const handleLock = () => {
    const userInput = window.confirm(
      `Memory is locked. To open this memory you should be at a radius of ${memory.memoryRadius} kms to it. To open the directions guide to the memory, click OK`
    );

    if (userInput) {
      setDirectionCredentials(memory);
      setShowDirectionsSidebar(true);
    }
  };

  return (
    <>
      <VStack
        fontFamily={'Alkatra !important'}
        backgroundColor={'rgb(59 130 246 / 0.5)'}
        borderRadius={'1rem'}
        padding={'1.25rem 1.5rem'}
        color={'black'}
        maxW={'300px'}
        boxShadow={'0 4px 8px rgba(0, 0, 0, 0.2)'}
      >
        <div className="popup-header">
          <Heading
            fontSize={'1.5rem'}
            fontWeight={'bold'}
            className="popup-title"
          >
            {memory.title ? memory.title : 'No title to show'}
          </Heading>
        </div>
        <Divider />
        <div className="popup-body">
          <ul className="popup-info">
            {/* <span className="material-symbols-outlined"></span> */}
            <HStack>
              <span className="material-symbols-outlined">person</span>
              calendar_month
              <Text fontSize={'1rem'} mt={'1rem'}>
                {memory.owner[0].name
                  ? memory.owner[0].name
                  : 'No name to show'}
              </Text>
            </HStack>

            <HStack>
              <span className="material-symbols-outlined">description</span>{' '}
              <Text fontSize={'1rem'} mt={'1rem'}>
                {memory.caption ? memory.caption : 'No caption to show'}
              </Text>
            </HStack>
            <HStack>
              <span className="material-symbols-outlined">map</span>{' '}
              <Text fontSize={'1rem'}>{'Random address'}</Text>
            </HStack>
          </ul>
        </div>
        <Divider />
        <HStack>
          {isLocked ? (
            <Button
              color="black"
              fontWeight={'light !important'}
              backgroundColor={'orange'}
              my="2"
              mx="auto"
              variant="ghost"
              padding={'0.5rem'}
              justifyContent="flex-start"
              _hover={{ backgroundColor: '#f3a619', color: 'black' }}
              onClick={handleLock}
            >
              <span className="material-symbols-outlined">lock</span>
              <Text>Unlock Memory</Text>
            </Button>
          ) : (
            <Button
              color="black"
              fontWeight={'light !important'}
              backgroundColor={'orange'}
              my="2"
              mx="auto"
              variant="ghost"
              padding={'0.5rem'}
              justifyContent="flex-start"
              _hover={{ backgroundColor: '#f3a619', color: 'black' }}
            >
              <a
                href={`/memories/${memory._id}/view`}
                style={{ display: 'flex' }}
              >
                <span className="material-symbols-outlined">lock_open</span>
                <Text fontSize={'0.75rem'}>View Memory</Text>
              </a>
            </Button>
          )}
        </HStack>
      </VStack>
    </>
  );
};

export default MarkerPopupContent;

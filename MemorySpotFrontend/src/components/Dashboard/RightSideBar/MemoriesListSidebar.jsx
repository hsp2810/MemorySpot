import React from 'react';
import { Stack, Heading, Text, HStack, Button } from '@chakra-ui/react';
import MemoryItemSidebar from './MemoryItemSidebar';
import '../../../assets/css/memoriessidebar.css';
import { useSelector } from 'react-redux';
import { ViewIcon } from '@chakra-ui/icons';

const popup = {
  show: false,
  memory: null,
};

const MemoriesListSidebar = ({
  map,
  setShowDirectionsSidebar,
  memory,
  showDirectionsSidebar,
}) => {
  const { memoriesToShow } = useSelector(state => state.map);

  const handleMarkerClick = memory => {
    const targetPosition = {
      lng: parseFloat(memory.longitude),
      lat: parseFloat(memory.latitude),
    };
    map.flyTo({
      center: targetPosition,
      zoom: 18,
      speed: 2,
    });
  };

  return (
    <>
      <Stack marginRight={'1rem'}>
        <HStack>
          {memory && !showDirectionsSidebar && (
            <Button
              onClick={() => {
                setShowDirectionsSidebar(true);
              }}
            >
              <ViewIcon />
            </Button>
          )}

          <Heading
            size="lg"
            textAlign={'center !important'}
            w={'100%'}
            color={'orange'}
          >
            Memories List
          </Heading>
        </HStack>

        {!memoriesToShow || memoriesToShow === undefined ? (
          <Text size="md" textAlign={'center'}>
            No memories found.
          </Text>
        ) : memoriesToShow.length === 0 ? (
          <Text size="md" textAlign={'center'}>
            Nothing to show.
          </Text>
        ) : (
          memoriesToShow.map((memory, index) => {
            return (
              <MemoryItemSidebar
                key={index}
                memory={memory}
                handleMarkerClick={handleMarkerClick}
              />
            );
          })
        )}
      </Stack>
    </>
  );
};

export default MemoriesListSidebar;

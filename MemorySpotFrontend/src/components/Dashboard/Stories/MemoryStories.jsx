import React, { useState } from 'react';
import '../../../assets/css/memoryStory.css';
import MemoryStory from './MemoryStory';

import { useSelector } from 'react-redux';
import { Text } from '@chakra-ui/react';

const MemoryStories = ({ map, memories }) => {
  const { friendsList24 } = useSelector(state => state.memory);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScrollClick = direction => {
    const container = document.getElementById('container');
    const containerScrollPosition = container.scrollLeft;
    const containerWidth = container.offsetWidth;

    let newPosition = containerScrollPosition;

    if (direction === 'left') {
      newPosition -= containerWidth;
    } else if (direction === 'right') {
      newPosition += containerWidth;
    }

    if (newPosition < 0) {
      newPosition = 0;
    } else if (newPosition > container.scrollWidth - containerWidth) {
      newPosition = container.scrollWidth - containerWidth;
    }

    setScrollPosition(newPosition);
    container.scrollTo({ left: newPosition, behavior: 'smooth' });
  };

  return (
    <div style={{ minWidth: '66vw' }}>
      {friendsList24.length === 0 ? (
        <Text textAlign={'center'}>
          No stories by your friends in the last 24 hours
        </Text>
      ) : (
        <div className="memorySt">
          <span
            className="material-symbols-outlined arrow left"
            onClick={() => handleScrollClick('left')}
          >
            arrow_circle_left
          </span>
          <div className="scroll-container" id="container">
            {friendsList24.map((friend, index) => {
              return <MemoryStory key={index} friend={friend} map={map} />;
            })}
          </div>
          <span
            className="material-symbols-outlined arrow right"
            onClick={() => handleScrollClick('right')}
          >
            arrow_circle_right
          </span>
        </div>
      )}
    </div>
  );
};

export default MemoryStories;

/*
    <div
      className="memorySt"
      style={{
        display: 'flex',
        overflowX: 'scroll',
        overflowY: 'hidden',
        width: '50vw',
      }}
    >
      {memories.map((memory, index) => {
        return <MemoryStory key={index} memory={memory} />;
      })}
    </div>
*/

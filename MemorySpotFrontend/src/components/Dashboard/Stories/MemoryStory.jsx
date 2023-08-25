import { Avatar, Text, WrapItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import '../../../assets/css/spinner.css';
import axios from 'axios';

const MemoryStory = ({ friend, map }) => {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    fetchFrMemUpLast24();
  }, []);

  const fetchFrMemUpLast24 = async () => {
    const { data } = await axios.post(
      'http://localhost:5000/api/v1/memories/friend',
      {
        friend_id: friend._id,
      },
      {
        withCredentials: true,
      }
    );
    setMemories(data.memories);
  };

  const handleStoryClick = () => {
    const memory = memories[0];
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
      {friend === undefined ? (
        'Memory is undefined'
      ) : (
        <WrapItem
          onClick={handleStoryClick}
          display={'flex'}
          flexDirection={'column'}
          textAlign={'center'}
          alignItems={'center !important'}
          height={'6em'}
          borderRadius={'1rem'}
          _hover={{
            bgColor: '#ffa50036',
            transition: 'ease-in 0.2s',
            cursor: 'pointer',
          }}
          w={'5em'}
        >
          <div
            style={{
              height: '200px',
              position: 'relative',
              margin: '1rem 0.75rem',
            }}
          >
            {console.log('Friend is: ', friend)}
            <Avatar
              name={friend.name.split(' ')[0]}
              src={friend.profile === undefined ? '' : friend.profile.url}
              bgColor={'orange'}
            />
            <Text fontSize={'sm'}>{friend.name.split(' ')[0]}</Text>
          </div>
        </WrapItem>
      )}
    </>
  );
};

export default MemoryStory;

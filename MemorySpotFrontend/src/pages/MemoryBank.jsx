import React, { useState } from 'react';
import { Box, Heading, SimpleGrid, HStack, Button } from '@chakra-ui/react';
import { memories } from '../services/tempData.js';
import Memorybank from '../components/MemoryBank/Memorybank';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { actionFetchSavedMemories } from '../redux/actions/memoryActions.js';
import MyMemory from '../components/MyMemories/MyMemory.jsx';
import SavedMemory from '../components/MemoryBank/SavedMemory.jsx';

const MemoryBank = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin } = useSelector(state => state.auth);
  const { savedMemories } = useSelector(state => state.memory);

  useEffect(() => {
    if (!isLogin) {
      navigate('/');
    } else {
      fetchSavedMemories();
    }
  }, []);

  const fetchSavedMemories = async () => {
    await actionFetchSavedMemories(dispatch);
  };

  return (
    isLogin && (
      <Box p={12}>
        <Heading as="h1" textAlign="center" mb={4}>
          Memory Bank
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={8} padding={'1rem'}>
          {savedMemories.length === 0 ? (
            <Heading textAlign={'center'} fontSize={'md'}>
              You haven't saved any memories
            </Heading>
          ) : (
            savedMemories.map((memory, index) => (
              <SavedMemory
                key={index}
                _id={
                  memory.memory[0]._id ? memory.memory[0]._id : 'No id found'
                }
                title={
                  memory.memory[0].title
                    ? memory.memory[0].title
                    : 'No title found'
                }
                caption={memory.memory[0].caption}
                address={'Random address'}
                longitude={memory.longitude}
                latitude={memory.latitude}
                memoryRadius={memory.memoryRadius}
                owner={memory.owner[0].name}
                datePosted={memory.memory[0].uploadedDate}
              />
            ))
          )}
        </SimpleGrid>
      </Box>
    )
  );
};

export default MemoryBank;

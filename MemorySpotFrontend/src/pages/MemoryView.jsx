import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  HStack,
  Avatar,
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// import '../assets/css/memoryview.css';
import { useParams } from 'react-router-dom';
import {
  actionFetchMemoryByID,
  actionSaveMemory,
} from '../redux/actions/memoryActions';
import { convertToDate } from '../utils/Dates/datetimeconvertor';

const MemoryView = () => {
  const dispatch = useDispatch();
  const { memory, alert } = useSelector(state => state.memory);
  const { id } = useParams();
  const { isLogin, homeUser } = useSelector(state => state.auth);

  // useEffect(() => {
  //   if (!isLogin) {
  //     navigate('/');
  //   }
  // }, []);

  useEffect(() => {
    fetchMemoryByID();
  }, []);

  const handleSaved = async () => {
    await actionSaveMemory(id, homeUser._id, dispatch);

    if (alert !== null && alert !== undefined) {
      window.alert(`${alert.type}: ${alert.message}`);
    }
  };

  const fetchMemoryByID = async () => {
    await actionFetchMemoryByID(id, dispatch);
  };

  return !memory ? (
    'Memory is loading...'
  ) : (
    <Box
      p={'1rem !important'}
      borderRadius="md"
      backgroundColor="white"
      boxShadow="md"
      className="post-container"
      margin={'1rem auto'}
      w={'50%'}
    >
      <Flex alignItems="center" mb={2} className="post-header">
        {/* <Avatar
          mr={4}
          name={memory[0].owner[0].name}
          url={
            memory[0].owner[0].profile === undefined
              ? console.log('OFbeopgbeu[')
              : memory[0].owner[0].profile.url
          }
        /> */}
        <Avatar
          mr={4}
          name={memory[0].owner[0].name}
          src={
            memory[0].owner[0].profile === undefined
              ? ''
              : memory[0].owner[0].profile.url
          }
          bgColor={'orange'}
        />
        <Box>
          <Heading as="h3" size="md" className="post-title" color={'black'}>
            {memory[0].title}
          </Heading>
          <Text fontSize="sm" color="gray.500" className="post-metadata">
            Uploaded by <b>{memory[0].owner[0].name}</b> |
            <b> {convertToDate(memory[0].uploadedDate)}</b>
          </Text>
        </Box>
        {memory[0].owner[0]._id === homeUser._id ? (
          ''
        ) : (
          <Button
            color="black"
            fontWeight={'light !important'}
            my="2"
            mx="auto"
            variant="ghost"
            padding={'0.5rem'}
            ml={'20rem'}
            justifyContent="flex-start"
            _hover={{ backgroundColor: '#f3a619', color: 'black' }}
            onClick={handleSaved}
          >
            <span className="material-symbols-outlined">bookmark</span>
          </Button>
        )}
      </Flex>
      <HStack>
        <video
          width="640"
          height="360"
          controls
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          autoPlay
          src={memory[0].memoryfile.url}
        ></video>
      </HStack>
      <Heading
        fontSize={'1rem'}
        className="post-content"
        color={'black'}
        mt={'1rem'}
      >
        {memory[0].caption}
      </Heading>
    </Box>
  );
};

export default MemoryView;

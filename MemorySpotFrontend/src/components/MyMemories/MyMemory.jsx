import {
  Box,
  Button,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ButtonGroup,
} from '@chakra-ui/react';
import { FormLabel, Input, Switch, Stack, FormControl } from '@chakra-ui/react';
import React, { useState } from 'react';
import { convertToDate } from '../../utils/Dates/datetimeconvertor';
import RangeSlider from '../utils/Slider/RangeSlider';
import { actionRemUserMemories } from '../../redux/actions/memoryActions';
import { useDispatch } from 'react-redux';

const MyMemory = props => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [memoryDetails, setMemoryDetails] = useState({
    title: props.title,
    caption: props.caption,
  });
  const [radius, setRadius] = useState(props.memoryRadius);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleEditMemory = () => {
    console.log('Editing the memory');
  };

  const handleDelete = async () => {
    const userPermission = window.confirm(
      'Are you sure you want to delete the memory? Once you delete it there is no way to restore it back.'
    );

    if (userPermission) {
      await actionRemUserMemories(props._id, dispatch);
      window.alert('Memory Deleted');
    }
  };

  return (
    <>
      <Box
        p={6}
        boxShadow="md"
        rounded="md"
        borderWidth={1}
        transition={'0.1s ease-in'}
      >
        {/* <Image src={props.image} alt={props.title} mb={4} /> */}
        <Text fontSize={'sm'}>{convertToDate(props.datePosted)}</Text>
        <Heading as="h2" size="lg" my={2}>
          {props.title}
        </Heading>
        <Text fontSize="md" mb={4}>
          {props.caption}
        </Text>
        <ButtonGroup spacing={2}>
          <Button colorScheme="orange" size="sm">
            <a href={`/memories/${props._id}/view`}>View</a>
          </Button>
          <Button colorScheme="green" size="sm" onClick={handleOpen}>
            Edit
          </Button>
          <Button colorScheme="red" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </ButtonGroup>
      </Box>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={'2xl'}>Edit Memory</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input type="text" id="name" value={memoryDetails.title} />
            </FormControl>
            <FormControl mt={'0.5rem'}>
              <FormLabel>Caption</FormLabel>
              <Input type="text" id="owner" value={memoryDetails.caption} />
            </FormControl>
            <FormControl mt={'1rem'}>
              <FormLabel>Accessibility Radius</FormLabel>
              <RangeSlider radius={radius} setRadius={setRadius} />
            </FormControl>
            <Button
              onClick={handleEditMemory}
              margin={'2rem auto'}
              colorScheme="orange"
            >
              Update
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default MyMemory;

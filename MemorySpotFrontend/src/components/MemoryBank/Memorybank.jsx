// Not using this code
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { useState } from 'react';

const Memorybank = props => {
  const [showModal, setShowModal] = useState(false);

  const handleViewClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Box
      p={6}
      boxShadow="md"
      rounded="md"
      borderWidth={1}
      borderColor="blue.200"
      _hover={{
        borderColor: 'orange.400',
      }}
    >
      <Image src={props.image} alt={props.title} mb={4} />
      <Heading as="h2" size="lg" mb={2}>
        {props.title}
      </Heading>
      <Text fontSize="md" mb={4}>
        {props.description}
      </Text>
      <Button colorScheme="orange" size="sm" onClick={handleViewClick}>
        View
      </Button>
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={props.image} alt={props.title} mb={4} />
            <Text fontSize="md" mb={4}>
              {props.description}
            </Text>
            <Text fontSize="md" mb={4}>
              Address: {props.address}
            </Text>
            <Text fontSize="md" mb={4}>
              Owner: {props.owner}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Memorybank;

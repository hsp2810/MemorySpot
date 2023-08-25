import React, { useState, useEffect } from 'react';
import '../assets/css/User_Profile.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import bg from '../assets/images/user_profilebg.png';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Image,
  Flex,
  HStack,
  Heading,
  VStack,
  Avatar,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

function UserProfile() {
  const { homeUser } = useSelector(state => state.auth);
  const [editUser, setEditUser] = useState(homeUser);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isLogin } = useSelector(state => state.auth);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleInput = e => {
    console.log(e.target.name);
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = e => {};

  return (
    homeUser && (
      <HStack flex={100}>
        <HStack height={'100vh'} flex={50}>
          <Image
            src={bg}
            alt="Dan Abramov"
            backgroundPosition={'center'}
            backgroundSize={'cover'}
            height={'100vh'}
            opacity={'0.4'}
          />
          {/* <video
            controls
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            autoPlay
            src={lynden}
          ></video> */}
        </HStack>
        <HStack flex={50} p={'2rem'}>
          <div className="profile-container">
            <HStack>
              <Avatar
                size="xl"
                name={homeUser.name}
                src={homeUser.profile.url}
              />
              <VStack alignItems={'flex-start'}>
                <Heading fontSize={'1.5rem'}>{homeUser.name}</Heading>
                <Text color={'orange'}>@{homeUser.username}</Text>
              </VStack>
            </HStack>

            <Flex
              alignItems={'flex-start'}
              justifyContent={'center'}
              flexDir={'column'}
              mt={'2rem'}
            >
              <HStack alignItems={'flex-start'}>
                <Heading fontSize={'1.5rem'}>Myself </Heading>
                <Text maxW={'60vh'} marginLeft={'2rem !important'}>
                  {
                    'Hi. My name’s River. I’m from San Francisco & I film concerts for a living. I quite enjoy what I do. Before that, I was a lawyer. Courts got too boring so I decided to live life a bit more loose. My family owns a liquor store, so if I ever needed a job, I could’ve easily started there. But I wanted to take my own path. And my path was my camera.'
                  }
                </Text>
              </HStack>
              <HStack alignItems={'center'} mt={'1rem'}>
                <Heading fontSize={'1.5rem'}>Friends </Heading>
                <Text marginLeft={'1.5rem !important'} color="orange">
                  {homeUser.friends.length}
                </Text>
              </HStack>
              <ButtonGroup margin={'4rem auto'}>
                <Button colorScheme="green" onClick={handleOpen}>
                  Edit Profile
                </Button>
                <Button colorScheme="red">Delete Account</Button>
              </ButtonGroup>
            </Flex>

            <Modal isOpen={isOpen} onClose={handleClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader fontSize={'2xl'}>Edit Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      id="name"
                      value={editUser.name}
                      onChange={handleInput}
                      name="name"
                    />
                  </FormControl>
                  <FormControl mt={'0.5rem'}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="text"
                      id="email"
                      disabled
                      value={editUser.email}
                      name="email"
                    />
                  </FormControl>
                  <FormControl mt={'0.5rem'}>
                    <FormLabel>Username</FormLabel>
                    <Input
                      type="text"
                      id="username"
                      value={editUser.username}
                      onChange={handleInput}
                      name="username"
                    />
                  </FormControl>
                  <FormControl mt={'0.5rem'}>
                    <FormLabel>Bio</FormLabel>
                    <Input
                      type="text"
                      id="bio"
                      value={editUser.bio}
                      onChange={handleInput}
                      name="bio"
                    />
                  </FormControl>
                  <FormControl mt={'0.5rem'}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="text"
                      id="password"
                      onChange={handleInput}
                      name="password"
                    />
                  </FormControl>
                  <Button
                    onClick={handleProfileUpdate}
                    margin={'2rem auto'}
                    colorScheme="orange"
                  >
                    Update
                  </Button>
                </ModalBody>
              </ModalContent>
            </Modal>
          </div>
        </HStack>
      </HStack>
    )
  );
}

export default UserProfile;

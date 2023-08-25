import React, { useEffect, useRef, useState } from 'react';
import '../../assets/css/User_Profile.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Text,
  Flex,
  HStack,
  Heading,
  VStack,
  Avatar,
  Box,
  Button,
  Stack,
  Spinner,
} from '@chakra-ui/react';
import { actionFetchUserByUsername } from '../../redux/actions/userActions';
import { actionFetchMemoriesByUserID } from '../../redux/actions/memoryActions';
import mapboxgl from 'mapbox-gl';
import ImplementMapbox from '../../services/mapService/setup';
import { addMarkers } from '../../services/mapService/marker';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import DirectionSidebar from '../Dashboard/LeftSideBar/DirectionsSidebar';
import { ViewIcon } from '@chakra-ui/icons';
import { actionClearAlert } from '../../redux/actions/alertActions';
import { actionAddFriend } from '../../redux/actions/friendsActions';

mapboxgl.accessToken =
  'pk.eyJ1IjoibHluZGVua2lkZCIsImEiOiJjbGR0OWM3eGwyM3hqM3BxdWV4MHdkbWthIn0.QDkKI9r49hYmAfavmj5n9g';

const OtherUserProfile = () => {
  const { user } = useSelector(state => state.user);
  const { homeUser } = useSelector(state => state.auth);
  const { userProfileMemories } = useSelector(state => state.memory);
  const [map, setMap] = useState(null);
  const dispatch = useDispatch();
  const { username } = useParams();
  const mapContainerRef = useRef(null);
  const { userLongitude, userLatitude } = useSelector(state => state.map);
  const [userZoom, setUserZoom] = useState(12);
  const [showDirectionsSidebar, setShowDirectionsSidebar] = useState(false);
  const [directionCredentials, setDirectionCredentials] = useState(null);
  const [mapIsLoaded, setMapIsLoaded] = useState(false);
  const { alert } = useSelector(state => state.friend);

  // For getting the user
  useEffect(() => {
    actionClearAlert(dispatch);
    fetchUser();
  }, [username]);

  useEffect(() => {
    fetchMemories();
  }, [user]);

  useEffect(() => {
    if (userLatitude !== 0 || userLongitude !== 0) {
      setMapIsLoaded(true);
    }
  }, [userLatitude, userLongitude]);

  // For initializing the map
  useEffect(() => {
    console.log('Got the user: ', user);
    console.log('Got the memories: ', userProfileMemories);
    console.log('Starting the map: ', userLatitude, userLongitude);
    if (!user || userProfileMemories.length === 0) return;
    const map = ImplementMapbox(
      userLongitude,
      userLatitude,
      userZoom,
      mapContainerRef,
      dispatch
    );

    setMap(map);

    if (userProfileMemories !== null && mapIsLoaded === true) {
      addMarkers(
        map,
        userProfileMemories,
        dispatch,
        userLongitude,
        userLatitude,
        MapboxDirections,
        setShowDirectionsSidebar,
        setDirectionCredentials,
        homeUser
      );
    }

    return;
  }, [userProfileMemories, mapIsLoaded]);

  const fetchUser = async () => {
    await actionFetchUserByUsername(username, dispatch);
  };

  const fetchMemories = async () => {
    await actionFetchMemoriesByUserID(user._id, dispatch);
  };

  const handleAddFriend = async () => {
    await actionAddFriend(homeUser._id, user._id, dispatch);
  };

  useEffect(() => {
    if (alert) {
      window.alert(alert.message);
      actionClearAlert(dispatch);
    }
  }, [alert]);

  return (
    <>
      {!user ? (
        <Stack mt={'2rem'} justifyContent={'center'}>
          <Spinner margin={'auto'} />
        </Stack>
      ) : (
        <VStack mb={'1rem'}>
          <HStack p={'2rem'}>
            <div className="profile-container">
              <HStack>
                <Avatar size="xl" name={user.name} bgColor={'orange'} />
                <VStack
                  alignItems={'flex-start'}
                  marginLeft={'1rem !important'}
                  lineHeight={'1rem !important'}
                >
                  <Heading fontSize={'1.5rem'}>{user.name}</Heading>
                  <Text color={'orange'}>@{user.username}</Text>
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
                    {user.friends.length}
                  </Text>
                </HStack>
                <Button
                  margin={'auto'}
                  mt={'1rem'}
                  colorScheme="orange"
                  onClick={handleAddFriend}
                >
                  Add as a friend
                  <span
                    className="material-symbols-outlined"
                    style={{ marginLeft: '0.5rem' }}
                  >
                    group_add
                  </span>
                </Button>
              </Flex>
            </div>
          </HStack>
          <VStack m={'5rem'}>
            <Heading>Uploads</Heading>
            <HStack flex={100}>
              <Stack display={'flex'} flex={80}>
                {!userProfileMemories || userProfileMemories.length === 0 ? (
                  'Nothing to show'
                ) : (
                  <Box
                    height={'86vh'}
                    w={'80vw'}
                    borderRadius={'0.5rem'}
                    ref={mapContainerRef}
                    className="map-container"
                  />
                )}
              </Stack>
              <Box display={'flex'} flex={30}>
                {showDirectionsSidebar && (
                  <DirectionSidebar
                    map={map}
                    setShowDirectionsSidebar={setShowDirectionsSidebar}
                    memory={directionCredentials}
                  />
                )}
              </Box>
            </HStack>
          </VStack>
        </VStack>
      )}
    </>
  );
};

export default OtherUserProfile;

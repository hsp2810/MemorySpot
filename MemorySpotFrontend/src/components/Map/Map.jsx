import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import '../../assets/css/recorder.css';
import ImplementMapbox from '../../services/mapService/setup';
import { addMarkers } from '../../services/mapService/marker';
import { useDispatch, useSelector } from 'react-redux';
import CreateEditMemory from '../Dashboard/Memories/CreateEditMemory';
import MemoriesListSidebar from '../Dashboard/RightSideBar/MemoriesListSidebar';
import MemoryStories from '../Dashboard/Stories/MemoryStories';
import {
  HStack,
  Stack,
  VStack,
  Button,
  Heading,
  Box,
  Badge,
  Avatar,
} from '@chakra-ui/react';
import '../../assets/css/popup-memory-map.css';
import '../../assets/css/map/map.css';
import { BsMoon } from 'react-icons/bs';
import { logout } from '../../redux/actions/authActions';
import { Link, useNavigate } from 'react-router-dom';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import {
  actionFriendsMemories,
  actionFrListUpMem24,
} from '../../redux/actions/memoryActions';
import DirectionSidebar from '../Dashboard/LeftSideBar/DirectionsSidebar';

mapboxgl.accessToken =
  'pk.eyJ1IjoibHluZGVua2lkZCIsImEiOiJjbGR0OWM3eGwyM3hqM3BxdWV4MHdkbWthIn0.QDkKI9r49hYmAfavmj5n9g';

const Map = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { homeUser } = useSelector(state => state.auth);
  const { friendsMemories, friendMemories24 } = useSelector(
    state => state.memory
  );
  const mapContainer = useRef(null);
  const { userLongitude, userLatitude } = useSelector(state => state.map);
  const [userZoom, setUserZoom] = useState(12);
  const [map, setMap] = useState(null);
  const [mapIsLoaded, setMapIsLoaded] = useState(false);
  const [showDirectionsSidebar, setShowDirectionsSidebar] = useState(false);
  const [directionCredentials, setDirectionCredentials] = useState(null);

  const handleLogout = async e => {
    await logout(dispatch);
    navigate('/');
  };

  // Fetch the memeories to display them to the stories
  useEffect(() => {
    fetchFrlistUpMem24();
  }, []);

  useEffect(() => {
    fetchFriendsMemories();
  }, []);

  useEffect(() => {
    if (userLatitude !== 0 || userLongitude !== 0) {
      setMapIsLoaded(true);
    }
  }, [userLatitude, userLongitude]);

  useEffect(() => {
    const map = ImplementMapbox(
      userLongitude,
      userLatitude,
      userZoom,
      mapContainer,
      dispatch,
      MapboxDirections
    );

    setMap(map);

    console.log(
      'Printing whether the map is fully loaded or not: ',
      mapIsLoaded
    );

    if (friendsMemories !== null && mapIsLoaded === true) {
      addMarkers(
        map,
        friendsMemories,
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
  }, [friendsMemories, mapIsLoaded]);

  const fetchFrlistUpMem24 = async () => {
    await actionFrListUpMem24(dispatch);
  };

  const fetchFriendsMemories = async () => {
    await actionFriendsMemories(dispatch);
  };

  return (
    <>
      <VStack>
        <HStack justifyContent={'space-around'} minH={'7em'}>
          <VStack flex={15} alignItems={'flex-start'}>
            {homeUser.isAdmin && (
              <Badge colorScheme="orange">Admin Access</Badge>
            )}
            <Heading fontSize={'1.5rem'} isTruncated={true} noOfLines={3}>
              Hello,
              <br />
              <Box color={'orange'}>{homeUser.name}</Box>
            </Heading>
          </VStack>
          <MemoryStories map={map} />
          <HStack flex={15}>
            <Button>
              <BsMoon />
            </Button>
            <Button
              colorScheme={'red'}
              onClick={handleLogout}
              marginLeft={'1rem'}
            >
              Logout
            </Button>
            <Link to={`/home/profile`}>
              <Avatar
                size="md"
                cursor={'pointer'}
                name={homeUser.name}
                bgColor={'orange'}
                marginLeft={'.5rem'}
                src={homeUser.profile === undefined ? '' : homeUser.profile.url}
              ></Avatar>
            </Link>
          </HStack>
        </HStack>
        <HStack
          width={'100%'}
          justifyContent={'flex-end'}
          margin={'0rem !important'}
          alignItems={'center'}
        >
          <div
            style={{
              height: '86vh',
              width: '75vw',
              float: 'left',
              borderRadius: '0.5rem',
            }}
            ref={mapContainer}
            className="map-container"
          />

          {showDirectionsSidebar && (
            <DirectionSidebar
              map={map}
              setShowDirectionsSidebar={setShowDirectionsSidebar}
              memory={directionCredentials}
            />
          )}
          <Stack
            // minWidth={'20vw'}
            width={'20vw'}
            height={'86vh'}
            overflowY="scroll"
            className="sidebar"
          >
            <MemoriesListSidebar
              map={map}
              setShowDirectionsSidebar={setShowDirectionsSidebar}
              memory={directionCredentials}
              showDirectionsSidebar={showDirectionsSidebar}
            />
          </Stack>
        </HStack>
        <CreateEditMemory className="createMemoryButton" />
      </VStack>{' '}
    </>
  );
};

export default Map;

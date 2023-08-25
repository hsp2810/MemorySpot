import React, { useState } from 'react';
import CurrentLocation from './CurrentLocation';
import RangeSlider from '../../utils/Slider/RangeSlider';
import {
  FormLabel,
  Input,
  Tab,
  TabList,
  FormControl,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
  Box,
  Heading,
  Flex,
  HStack,
} from '@chakra-ui/react';
import Popup from 'reactjs-popup';
import VideoRecorder from '../../utils/VideoRecorder/VideoRecorder';
import { useDispatch, useSelector } from 'react-redux';
import { actionUploadMemory } from '../../../redux/actions/memoryActions';
import '../../../assets/css/all.css';

const CreateEditMemory = () => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [activeTab, setActiveTab] = useState(0);
  const [recordedVideo, setRecordedVideo] = useState(null);

  return (
    <div>
      <Box
        position="absolute"
        bottom="5%"
        right={'25%'}
        left="50%"
        transform="translateX(-50%)"
      >
        <button
          type="button"
          className="secondary-button"
          onClick={() => setOpen(o => !o)}
          style={{ padding: '1.5rem 2.5rem' }}
        >
          <span className="material-symbols-outlined">add</span> Drop Memory
        </button>
      </Box>

      {/* The main popup component will only load if open is true */}
      {open && (
        <Popup
          open={open}
          closeOnDocumentClick
          onClose={closeModal}
          contentStyle={{
            backgroundColor: 'white', // Set the background color of the popup content
            padding: '20px',
            width: '50vw',
            height: '98vh',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
          overlayStyle={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Set the overlay background color and opacity
            zIndex: '998', // Set the overlay z-index
          }}
        >
          <div className="modal">
            <a
              className="close"
              onClick={closeModal}
              style={{
                float: 'right',
                cursor: 'pointer',
                position: 'sticky',
              }}
            >
              <span className="material-symbols-outlined">close</span>
            </a>

            <Heading
              textTransform={'uppercase'}
              textAlign={'center'}
              color={'orange'}
              size={'lg'}
            >
              Drop Memory
            </Heading>

            <Tabs
              isManual="false"
              isFitted
              variant="enclosed"
              colorScheme="cyan"
              isLazy
              index={activeTab}
            >
              <TabList>
                <Tab mt={'2em'}>Record</Tab>
                <Tab mt={'2em'}>Details</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <VideoRecorder
                    setActiveTab={setActiveTab}
                    recordedVideo={recordedVideo}
                    setRecordedVideo={setRecordedVideo}
                  />
                </TabPanel>
                <TabPanel>
                  <CreateMemoryForm
                    setActiveTab={setActiveTab}
                    recordedVideo={recordedVideo}
                    setRecordedVideo={setRecordedVideo}
                    closeModal={closeModal}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
            {/* Content ends here */}
          </div>
        </Popup>
      )}
    </div>
  );
};

const defMemoryDetails = {
  title: '',
  caption: '',
};

export const CreateMemoryForm = props => {
  const { homeUser } = useSelector(state => state.auth);
  const { alert } = useSelector(state => state.memory);
  const dispatch = useDispatch();
  const [memoryDetails, setMemoryDetails] = useState(defMemoryDetails);
  const { userLongitude, userLatitude, userAddress } = useSelector(
    state => state.map
  );
  const [radius, setRadius] = useState(5);

  const handleDropMemory = async () => {
    console.log(props.recordedVideo);
    const blob = await fetch(props.recordedVideo).then(res => res.blob());
    const formData = new FormData();
    formData.append('caption', memoryDetails.caption);
    formData.append('latitude', userLatitude);
    formData.append('longitude', userLongitude);
    formData.append('address', userAddress);
    formData.append('memoryRadius', radius);
    formData.append('title', memoryDetails.title);
    formData.append('memoryfile', blob);

    console.log('Printing the form data: ', formData);

    if (userLatitude === '' || userLongitude === '' || userAddress === '') {
      window.alert('Wait until the app figures out your location');
    } else {
      await actionUploadMemory(formData, homeUser._id, dispatch);

      window.alert('Successfully uploaded the memory');
      props.setRecordedVideo(null);
      props.closeModal();
      // if (alert.type === 'error') {
      //   window.alert(alert.message);
      // } else {
      //   window.alert(alert.message);
      // }
    }
  };

  const handleChange = e => {
    setMemoryDetails({ ...memoryDetails, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Flex flexDir={'column'}>
        <FormControl margin={'1rem 0rem'}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            id="name"
            value={memoryDetails.title}
            onChange={handleChange}
            name={'title'}
          />
        </FormControl>
        <FormControl margin={'1rem 0rem'}>
          <FormLabel>Caption</FormLabel>
          <Input
            type="text"
            id="owner"
            value={memoryDetails.caption}
            onChange={handleChange}
            name={'caption'}
          />
        </FormControl>

        {/* <FormControl margin={'1rem 0rem'}>
          <FormLabel>Grant Access</FormLabel>
          //Display the list of friends and a CHECKBOX to select
        </FormControl> */}

        <FormControl margin={'1rem 0rem'}>
          <FormLabel>Memory Location</FormLabel>
          <div>
            <p>
              Longitude:{' '}
              {userLongitude === '' ? 'Calculating longitude' : userLongitude}
            </p>
            <p>
              Latitude:{' '}
              {userLatitude === '' ? 'Calculating latitude' : userLatitude}
            </p>
            <p>
              Address:{' '}
              {userAddress === '' ? 'Calculating address' : userAddress}
            </p>
          </div>
        </FormControl>

        <FormControl margin={'1rem 0rem'}>
          <FormLabel>Accessibility Radius</FormLabel>
          <RangeSlider radius={radius} setRadius={setRadius} />
        </FormControl>

        <HStack m={'1rem 0rem'}>
          <Button
            w={'50%'}
            colorScheme={'blackAlpha'}
            onClick={() => {
              props.setActiveTab(tab => tab - 1);
            }}
          >
            Previous
            <span className="material-symbols-outlined">chevron_left</span>
          </Button>
          <Button w={'50%'} colorScheme={'orange'} onClick={handleDropMemory}>
            Drop Memory
          </Button>
        </HStack>
      </Flex>
    </>
  );
};

export default CreateEditMemory;

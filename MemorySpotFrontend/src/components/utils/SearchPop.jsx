import React, { useEffect, useState } from 'react';
import {
  Heading,
  Button,
  Input,
  HStack,
  Stack,
  VStack,
  Box,
} from '@chakra-ui/react';
import '../../assets/css/search.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SearchPop = ({ closeModal }) => {
  const navigate = useNavigate();
  const { allUsers } = useSelector(state => state.user);
  const [usersCopy, setUsersCopy] = useState([]);
  const [value, setValue] = useState('');

  const handleOnChange = e => {
    setValue(e.target.value);
    const filteredUsers = allUsers.filter(user => {
      return user.username.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setUsersCopy(filteredUsers);
  };

  const onSearch = () => {
    if (value === '') {
      alert('Please enter a username to view the profile');
    } else {
      closeModal();
      navigate(`/users/${value}`);
    }
  };

  return (
    <>
      {allUsers === undefined ? (
        'Wait. fetching the users'
      ) : (
        <Stack p={'1rem'}>
          <Heading textAlign={'center'}>Search</Heading>
          <Stack mt={'1rem'}>
            <HStack style={{ backgroundColor: 'white', border: 'orange' }}>
              <Input
                value={value}
                placeholder="Search for name or username"
                style={{ backgroundColor: '#fff6e1' }}
                onChange={handleOnChange}
              />
              <Button
                onClick={onSearch}
                style={{
                  width: '80px',
                  height: '40px',
                  color: 'black',
                  backgroundColor: 'orange',
                }}
              >
                Search
              </Button>
            </HStack>
            <VStack alignItems={'flex-start'}>
              {usersCopy.length === 0
                ? allUsers.map(user => {
                    return (
                      <Box
                        w={'100%'}
                        p={'0.5rem'}
                        cursor={'pointer'}
                        borderRadius={'0.5rem'}
                        key={user._id}
                        _hover={{ backgroundColor: 'lightgrey' }}
                        onClick={() => setValue(user.username)}
                      >
                        {user.username}
                      </Box>
                    );
                  })
                : usersCopy.map(user => {
                    return (
                      <Box
                        w={'100%'}
                        p={'0.5rem'}
                        cursor={'pointer'}
                        borderRadius={'0.5rem'}
                        key={user._id}
                        _hover={{ backgroundColor: 'lightgrey' }}
                        onClick={() => setValue(user.username)}
                      >
                        {user.username}
                      </Box>
                    );
                  })}
            </VStack>
          </Stack>
        </Stack>
      )}
    </>
  );
};
export default SearchPop;

import React, { useEffect, useState } from 'react';

import {
  Heading,
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  ListItem,
  List,
  HStack,
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import { fetchFriends, fetchUsers } from '../../../services/userService';
const Friends = () => {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    updateFriends();
  }, []);
  const updateFriends = () => {
    const freinds = fetchFriends();
    setFriends(freinds);
  };
  // Remove a friend from the list
  const removeFriend = id => {
    const updatedFriends = friends.filter(friend => friend.id !== id);
    setFriends(updatedFriends);
  };
  return (
    <Box margin="2rem">
      <Heading marginBottom="2rem">Friends</Heading>
      <Box overflowY="scroll" height="40vh">
        <List>
          {friends.map((friend, index) => {
            return (
              <ListItem key={index} padding="0.5rem">
                <Flex alignItems="center" justifyContent="space-between">
                  <HStack>
                    <Avatar
                      name={friend.name}
                      src={friend.avatar}
                      size="md"
                      mr={2}
                    />

                    <Heading size="md">{friend.name}</Heading>
                  </HStack>
                  <Button
                    size="sm"
                    variant="ghost"
                    style={{ backgroundColor: '#efefef', marginRight: '2rem' }}
                    onClick={() => removeFriend(friend.id)}
                  >
                    Remove
                  </Button>
                </Flex>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default Friends;

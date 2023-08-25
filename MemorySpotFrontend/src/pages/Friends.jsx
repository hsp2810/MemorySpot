import {
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Heading,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionFetchFriends,
  actionRemoveUser,
} from '../redux/actions/friendsActions';
import { Link } from 'react-router-dom';
import { actionClearAlert } from '../redux/actions/alertActions';

const Friends = () => {
  const dispatch = useDispatch();
  const { homeUser } = useSelector(state => state.auth);
  const { friends, loading, alert } = useSelector(state => state.friend);

  useEffect(() => {
    fetchFriends();
  }, [homeUser]);

  const fetchFriends = async () => {
    if (homeUser) {
      await actionFetchFriends(homeUser._id, dispatch);
    }
  };

  return (
    <>
      <Flex
        flexDir={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        marginTop={'3rem'}
      >
        <Heading>Friends</Heading>
        <VStack marginTop={'3rem'}>
          {loading ? (
            <Spinner />
          ) : (
            friends.map(friend => {
              return <Friend key={friend._id} friend={friend} />;
            })
          )}
        </VStack>
      </Flex>
    </>
  );
};

const Friend = ({ friend }) => {
  const { homeUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleRemove = async friend_id => {
    await actionRemoveUser(homeUser._id, friend_id, dispatch);

    if (alert) {
      window.alert(alert.message);
      actionClearAlert(dispatch);
    }
  };
  return (
    <>
      <HStack flex={100} width={'50vw'}>
        <Heading fontSize={'md'} display={'flex'} flex={40}>
          {friend.name}
        </Heading>
        <HStack justifyContent={'space-around'} flex={60}>
          <ButtonGroup spacing={8}>
            <Button colorScheme="blue">
              <Link to={`/users/${friend.username}`}>View Profile</Link>
            </Button>
            <Button colorScheme="red" onClick={() => handleRemove(friend._id)}>
              Remove
            </Button>
          </ButtonGroup>
        </HStack>
      </HStack>
    </>
  );
};

export default Friends;

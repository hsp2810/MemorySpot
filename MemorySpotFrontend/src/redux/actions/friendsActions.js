import axios from 'axios';

const uri = 'http://localhost:5000/api/v1/users';

export const actionFetchFriends = async (user_id, dispatch) => {
  try {
    dispatch({ type: 'fetchFriendsRequest' });

    const { data } = await axios.get(`${uri}/${user_id}/friendsDetails`, {
      headers: {
        'Content-type': 'application/json',
      },

      withCredentials: true,
    });
    console.log('Printing the friends list: ', data);
    dispatch({ type: 'fetchFriendsSuccess', payload: data });
  } catch (error) {
    console.log('Error in actionFriendsMemories', error);
    dispatch({
      type: 'fetchFriendsFail',
      payload: error.response.data,
    });
  }
};

export const actionRemoveUser = async (user_id, friend_id, dispatch) => {
  try {
    dispatch({ type: 'removeFriendRequest' });

    const { data } = await axios.delete(
      `${uri}/${user_id}/friends/${friend_id}`,
      {
        headers: {
          'Content-type': 'application/json',
        },

        withCredentials: true,
      }
    );
    dispatch({ type: 'removeFriendSuccess', payload: data });
  } catch (error) {
    console.log('Error in actionFriendsMemories', error);
    dispatch({
      type: 'removeFriendFail',
      payload: error.response.data,
    });
  }
};

export const actionAddFriend = async (user_id, friend_id, dispatch) => {
  try {
    dispatch({ type: 'addFriendRequest' });

    const { data } = await axios.get(`${uri}/${user_id}/friends/${friend_id}`, {
      headers: {
        'Content-type': 'application/json',
      },

      withCredentials: true,
    });
    dispatch({ type: 'addFriendSuccess', payload: data });
  } catch (error) {
    console.log('Error in adding as a friend', error);
    dispatch({
      type: 'addFriendFail',
      payload: error.response.data,
    });
  }
};

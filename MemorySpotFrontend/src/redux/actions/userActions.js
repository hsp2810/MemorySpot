import axios from 'axios';

const uri = 'http://localhost:5000/api/v1/users';

export const actionFetchAllUsers = async dispatch => {
  try {
    dispatch({ type: 'fetchAllUsersRequest' });

    const { data } = await axios.get(`${uri}`, {
      headers: {
        'Content-type': 'application/json',
      },

      withCredentials: true,
    });
    dispatch({ type: 'fetchAllUsersSuccess', payload: data });
  } catch (error) {
    console.log('Error in actionFriendsMemories', error);
    dispatch({
      type: 'fetchAllUsersFail',
      payload: error.response.data,
    });
  }
};

export const actionFetchUserByUsername = async (username, dispatch) => {
  try {
    dispatch({ type: 'fetchUserByUsernameRequest' });

    const { data } = await axios.get(`${uri}/usernames/${username}`, {
      headers: {
        'Content-type': 'application/json',
      },
      withCredentials: true,
    });
    dispatch({ type: 'fetchUserByUsernameSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'fetchUserByUsernameFail',
      payload: error.response.data,
    });
  }
};

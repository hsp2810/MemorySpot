import axios from 'axios';

const uri = 'http://localhost:5000/api/v1/memories';

export const actionFriendsMemories = async dispatch => {
  try {
    dispatch({ type: 'friendsMemoriesRequest' });

    const { data } = await axios.get(`${uri}/friends`, {
      headers: {
        'Content-type': 'application/json',
      },

      withCredentials: true,
    });

    console.log(
      'Printing the memories of friends returned by the backend: ',
      data.memories
    );
    dispatch({ type: 'friendsMemoriesSuccess', payload: data });
  } catch (error) {
    console.log('Error in actionFriendsMemories', error);
    dispatch({
      type: 'friendsMemoriesFail',
      payload: error.response.data,
    });
  }
};

export const actionFrMemUpMem24 = async (friend_id, dispatch) => {
  try {
    dispatch({ type: 'friendMemories24Request' });

    const { data } = await axios.post(
      `${uri}/friend`,
      {
        friend_id,
      },
      {
        withCredentials: true,
      }
    );

    console.log('Getting all the memories of my friend action: ', data);

    dispatch({ type: 'friendMemories24Success', payload: data });
  } catch (error) {
    dispatch({
      type: 'friendMemories24Fail',
      payload: error.response.data,
    });
  }
};

export const actionFrListUpMem24 = async dispatch => {
  try {
    dispatch({ type: 'friendsUpMem24Request' });

    const { data } = await axios.get(`${uri}/friends24`, {
      headers: {
        'Content-type': 'application/json',
      },

      withCredentials: true,
    });

    dispatch({ type: 'friendsUpMem24Success', payload: data });
  } catch (error) {
    dispatch({
      type: 'friendsUpMem24Fail',
      payload: error.response.data,
    });
  }
};

export const actionFetchMemoryByID = async (id, dispatch) => {
  try {
    dispatch({ type: 'memoryRequest' });
    console.log('Making the request to the bakcend');

    const { data } = await axios.get(`${uri}/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: 'memorySuccess', payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'memoryFail',
      payload: error.response.data,
    });
  }
};

export const actionUploadMemory = async (formData, user_id, dispatch) => {
  try {
    dispatch({ type: 'uploadMemoryRequest' });
    console.log('Printing the memory object in redux: ', formData);
    console.log('Printing the user id object in redux: ', user_id);

    const { data } = await axios.post(`${uri}/user/${user_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    dispatch({ type: 'uploadMemorySuccess', payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'uploadMemoryFail',
      payload: error.response.data,
    });
  }
};

export const actionFtHUserMemories = async (id, dispatch) => {
  try {
    dispatch({ type: 'fetchMyMemoriesRequest' });

    const { data } = await axios.get(`${uri}/user/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: 'fetchMyMemoriesSuccess', payload: data });
    console.log('Got the memories of login user: ', data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'fetchMyMemoriesFail',
      payload: error.response.data,
    });
  }
};

export const actionRemUserMemories = async (memory_id, dispatch) => {
  try {
    dispatch({ type: 'removeMyMemRequest' });

    const { data } = await axios.delete(`${uri}/${memory_id}`, {
      withCredentials: true,
    });

    dispatch({ type: 'removeMyMemSuccess', payload: data });
    console.log('Got the memories of login user: ', data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'removeMyMemFail',
      payload: error.response.data,
    });
  }
};

// Saving the memory to memory bank
export const actionSaveMemory = async (memory_id, user_id, dispatch) => {
  try {
    dispatch({ type: 'saveMemoryRequest' });

    const { data } = await axios.post(
      `${uri}/memorybank`,
      { memory_id, user_id },
      {
        withCredentials: true,
      }
    );

    dispatch({ type: 'saveMemorySuccess', payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'saveMemoryFail',
      payload: error.response.data,
    });
  }
};

// Fetching the saved memories from the memory bank
export const actionFetchSavedMemories = async dispatch => {
  try {
    dispatch({ type: 'fetchSavedMemoriesRequest' });

    const { data } = await axios.get(`${uri}/memorybank`, {
      withCredentials: true,
    });

    dispatch({ type: 'fetchSavedMemoriesSuccess', payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'fetchSavedMemoriesFail',
      payload: error.response.data,
    });
  }
};

// Fetching the memories of one user when seeing their profile
export const actionFetchMemoriesByUserID = async (user_id, dispatch) => {
  try {
    dispatch({ type: 'fetchMemoriesByUserIdRequest' });

    const { data } = await axios.get(`${uri}/user/${user_id}`, {
      withCredentials: true,
    });

    console.log('Getting all the memories of the profile user: ', data);

    dispatch({ type: 'fetchMemoriesByUserIdSuccess', payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'fetchMemoriesByUserIdFail',
      payload: error.response.data,
    });
  }
};

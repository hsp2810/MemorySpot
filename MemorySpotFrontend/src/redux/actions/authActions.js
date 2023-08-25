import axios from 'axios';
import { actionFetchAllUsers } from './userActions';

const uri = 'http://localhost:5000/api/v1/auth';

export const login = async (email, password, dispatch) => {
  try {
    console.log('Dispatching the request');
    dispatch({ type: 'loginRequest' });

    const { data } = await axios.post(
      `${uri}/login`,
      { email, password },
      {
        headers: {
          'Content-type': 'application/json',
        },

        withCredentials: true,
      }
    );

    dispatch({ type: 'loginSuccess', payload: data });

    //If the user login properly.
    await actionFetchAllUsers(dispatch);
  } catch (error) {
    // console.log('Error is in the login function', error);
    dispatch({ type: 'loginFail', payload: error.response.data });
  }
};

export const authenticate = async dispatch => {
  try {
    dispatch({ type: 'authRequest' });

    const { data } = await axios.get(
      `${uri}/authenticate`,
      { withCredentials: true },
      {
        headers: {
          'Content-type': 'application/json',
        },

        withCredentials: true,
      }
    );

    dispatch({ type: 'authSuccess', payload: data });
    // console.log('Authentication done');
    await actionFetchAllUsers(dispatch);
  } catch (error) {
    dispatch({ type: 'authFail', payload: error.response.data });
  }
};

export const register = async (dispatch, registerUser) => {
  try {
    dispatch({ type: 'registerRequest' });

    const { data } = await axios.post(`${uri}/register`, registerUser, {
      headers: {
        'Content-type': 'application/json',
      },

      withCredentials: true,
    });

    dispatch({ type: 'registerSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'registerFail', payload: error.response.data });
  }
};

export const logout = async dispatch => {
  try {
    dispatch({ type: 'logoutRequest' });
    console.log('In the logout action');

    const { data } = await axios.get(`${uri}/logout`, {
      withCredentials: true,
    });
    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'logoutFail', payload: error.response.data });
  }
};

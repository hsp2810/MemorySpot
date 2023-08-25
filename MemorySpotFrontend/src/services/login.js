import axios from 'axios';
const uri = 'http://localhost:5000/api/v1/auth';

export const signOnService = async user => {
  const route = user.isMember ? `${uri}/login` : `${uri}/register`;
  try {
    return await axios.post(route, user, {
      withCredentials: true,
    });
  } catch (error) {
    return error.response;
  }
};

export const authenticateUser = async endpoint => {
  const route = `${uri}${endpoint}`;
  try {
    const response = await axios.get(route, { withCredentials: true });
    // check response
    // if status ok send to dashboard or to login page
    return response;
  } catch (error) {
    console.log('not logged in yet');
    return error.response;
  }
};

export const actionClearAlert = async dispatch => {
  try {
    dispatch({ type: 'clearError' });
  } catch (error) {
    console.log('Could not able to clear the error: ', error);
  }
};

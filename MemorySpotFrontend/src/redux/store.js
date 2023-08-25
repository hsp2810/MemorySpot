import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';
import { mapReducer } from './reducers/mapReducer';
import { memoryReducer } from './reducers/memoryReducer';
import { friendsReducer } from './reducers/friendsReducer';
import { userReducer } from './reducers/userReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    memory: memoryReducer,
    map: mapReducer,
    friend: friendsReducer,
    user: userReducer,
  },
});

export default store;

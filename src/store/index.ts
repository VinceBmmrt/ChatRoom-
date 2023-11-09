import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './reducers/chat';

const store = configureStore({
  reducer: {
    // Je fournis le reducer à mon store
    chat: chatReducer,
  },
});

export default store;

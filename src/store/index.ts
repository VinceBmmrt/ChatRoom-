import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './reducers/chat';

const store = configureStore({
  reducer: {
    // Je fournis le reducer à mon store
    chat: chatReducer,
  },
});

export default store;

// Je déduis le type `RootState` et `AppDispatch` depuis le store lui même
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

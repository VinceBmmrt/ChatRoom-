import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './reducers/chat';
import settingsReducer from './reducers/settings';

const store = configureStore({
  reducer: {
    // Je fournis le reducer à mon store
    chat: chatReducer,
    settings: settingsReducer,
  },
});

export default store;

// Je déduis le type `RootState` et `AppDispatch` depuis le store lui même
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Redux store configuration
import { configureStore } from '@reduxjs/toolkit';
import flowersReducer from './flowers/slice';
import userReducer from './user/slice';

export const store = configureStore({
  reducer: {
    flowers: flowersReducer,
    user: userReducer,
  },
});

// Export types for use in the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

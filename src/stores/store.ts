import { configureStore } from '@reduxjs/toolkit';
import flowersReducer from './flowers/slice';
import authReducer from './auth/slice';
import arrangementsReducer from './arrangements/slice';

export const store = configureStore({
  reducer: {
    flowers: flowersReducer,
    auth: authReducer,
    arrangements: arrangementsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import flowersReducer from './flowers/slice';
import authReducer from './auth/slice';
import arrangementsReducer from './arrangements/slice';
import suppliersReducer from './suppliers/slice';

export const store = configureStore({
  reducer: {
    flowers: flowersReducer,
    auth: authReducer,
    arrangements: arrangementsReducer,
    suppliers: suppliersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

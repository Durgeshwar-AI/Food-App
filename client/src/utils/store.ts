import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// 👇 Export types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

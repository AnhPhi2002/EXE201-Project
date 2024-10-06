// store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from './redux/counterSlice';
import authReducer from './redux/authSlice'; 

const rootReducer = combineReducers({
  counter: counterReducer,  
  auth: authReducer,    
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

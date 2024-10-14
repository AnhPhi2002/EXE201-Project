// store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from './redux/counterSlice';
import authReducer from './redux/authSlice'; 
import departmentReducer from './redux/departmentSlice'; 

// Kết hợp các reducer
const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,  
  departments: departmentReducer,  
});

export const store = configureStore({
  reducer: rootReducer, 
});

// Suy ra kiểu RootState và AppDispatch từ chính store
export type RootState = ReturnType<typeof store.getState>;  
export type AppDispatch = typeof store.dispatch;

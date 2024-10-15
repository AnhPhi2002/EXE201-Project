import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from './redux/counterSlice';
import authReducer from './redux/authSlice';
import departmentReducer from './redux/departmentSlice';
import resourcesReducer from './redux/resourcesSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  departments: departmentReducer,
  resources: resourcesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

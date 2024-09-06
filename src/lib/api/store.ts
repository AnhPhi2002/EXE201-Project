
// store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from './redux/counterSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

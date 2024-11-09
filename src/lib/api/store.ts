import { combineReducers, configureStore } from '@reduxjs/toolkit';
import departmentReducer from './redux/departmentSlice';
import semesterReducer from './redux/semesterSlice';
import subjectReducer from './redux/subjectSlice';
import resourceReducer from './redux/resourceSlice';
import authReducer from './redux/authSlice';
import paymentReducer from './redux/paymentSlice';


const rootReducer = combineReducers({
  departments: departmentReducer,
  semesters: semesterReducer,
  subjects: subjectReducer,
  resources: resourceReducer,
  auth: authReducer,
  payment: paymentReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from './slices/user_slice';
import signUpSlice from './slices/signup_slice';
import showSlice from './slices/show_slice';
import scheduledShowsSlice from './slices/scheduled_shows_slice';

const reducer = combineReducers({
  user: userSlice,
  signup: signUpSlice,
  shows: showSlice,
  scheduled_shows: scheduledShowsSlice,
});

const store = configureStore({
  reducer,
});

export default store;

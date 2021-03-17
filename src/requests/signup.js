import { createAsyncThunk } from '@reduxjs/toolkit';

import { userEntity } from '../shared/schemas';
import { callAction } from './all_requests';
// Authentication API call for login

const requestSignup = createAsyncThunk(
  'signup/registerUser',
  async (user, thunkAPI) => {
    return await callAction({ user }, 'post', thunkAPI, '/users', 201, 'signup');
  },
);


export default requestSignup;

import { createAsyncThunk } from '@reduxjs/toolkit';

import { callAction } from './all_requests';
import { userEntity } from '../shared/schemas';
// Authentication API call for login

const requestAuthentication = createAsyncThunk(
  'user/authLogin',
  async (user, thunkAPI) => {
    return await callAction({ user }, 'post', thunkAPI, `/login`, 201, 'user');
  },
);

export default requestAuthentication;

import { createAsyncThunk } from '@reduxjs/toolkit';

import { callAction } from './all_requests';
import { userEntity } from '../shared/schemas';
// Authentication API call for login

const checkAuthentication = createAsyncThunk(
  'user/authLogin',
  async (data, thunkAPI) => {
    return await callAction(undefined, 'get',
      thunkAPI, '/logged_in', 200, 'user'
    );
  },
);
export default checkAuthentication;

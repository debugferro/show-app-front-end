import { createAsyncThunk } from '@reduxjs/toolkit';

import { callAction } from './all_requests';

// Sign Out Request

const logout = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    return await callAction(undefined, 'delete', thunkAPI, `/logout`, 200, 'user');
  },
);

export default logout;

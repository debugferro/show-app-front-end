import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import config from './config';

// Sign Out Request

const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${config.url}/logout`, { withCredentials: true });

      return response.data
    } catch (err) {
      if (!err.response) throw err; // No response message from backend (probably network failure)
      return rejectWithValue(err.response.data); // Any other type of error
    }
  },
);

export default logout;

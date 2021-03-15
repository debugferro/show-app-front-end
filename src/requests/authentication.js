import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import config from './config';

// Authentication API call for login

const requestAuthentication = createAsyncThunk(
  'user/authLogin',
  async (user, { rejectWithValue, getState, requestId }) => {
    const { presentRequestId, requestStatus } = getState().user;
    if (requestStatus !== 'pending' || requestId !== presentRequestId) return;

    try {
      const response = await axios.post(`${config.url}/login`, { user }, { withCredentials: true });
      if (response.data.status !== 201) {
        // Reject if backend answers with 401 unauthorized http status
        return rejectWithValue(response.data);
      }

      return response.data.user; // Success
    } catch (err) {
      if (!err.response) throw err; // No response message from backend (probably network failure)
      return rejectWithValue(err.response.data); // Any other type of error
    }
  },
);

export default requestAuthentication;

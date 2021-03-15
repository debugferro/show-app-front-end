import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import config from './config';

// Authentication API call for login

const requestSignup = createAsyncThunk(
  'signup/registerUser',
  async (user, { rejectWithValue, getState, requestId }) => {
    const { presentRequestId, requestStatus } = getState().signup;
    if (requestStatus !== 'pending' || requestId !== presentRequestId) return;
    try {
      const response = await axios.post(`${config.url}/users`, { user }, { withCredentials: true });
      // Reject if backend answers with any status other than 201/created http response
      if (response.data.status !== 201) {
        return rejectWithValue(response.data);
      }

      return response.data.entity; // Success
    } catch (err) {
      if (!err.response) throw err; // No response message from backend (probably network failure)
      return rejectWithValue(err.response.data); // Any other type of error
    }
  },
);

export default requestSignup;

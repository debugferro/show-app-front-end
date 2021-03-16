import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { normalize } from 'normalizr'

import config from './config';
import { scheduledShowEntity } from '../schemas';
// Authentication API call for login

const postScheduledShow = createAsyncThunk(
  'scheduled_show/post',
  async (data, { rejectWithValue, getState, requestId }) => {
    const scheduled_show = {
      show_id: data.show.value,
      scheduled_date: data.date.toJSON()
    }
    console.log(scheduled_show, data.date)
    try {
      const response = await axios.post(`${config.url}/scheduled_shows`, { scheduled_show }, { withCredentials: true });
      if (response.data.status !== 200) {
        // Reject if backend answers with 422 unprocessable entity http status
        return rejectWithValue(response.data);
      }

      console.log(response, "RESPOSTA")
      const normalized = normalize(response.data.entity, scheduledShowEntity)
      return normalized
    } catch (err) {
      if (!err.response) throw err; // No response message from backend (probably network failure)
      return rejectWithValue(err.response.data); // Any other type of error
    }
  },
);

export default postScheduledShow;

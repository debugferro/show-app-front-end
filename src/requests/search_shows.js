import { createAsyncThunk } from '@reduxjs/toolkit';
import { normalize } from 'normalizr'
import axios from 'axios';

import config from './config';
import { showEntity } from '../shared/schemas';

const searchShows = createAsyncThunk(
  'show/search',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${config.url}/shows/search?query=${query}`, { withCredentials: true });
      return normalize(response.data.entities, [showEntity])
    } catch (err) {
      if (!err.response) throw err; // No response message from backend (probably network failure)
      return rejectWithValue(err.response.data); // Any other type of error
    }
  },
);

export default searchShows;

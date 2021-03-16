import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { normalize } from 'normalizr'

import config from './config';
import { showEntity } from '../schemas';
// Sign Out Request

const searchShows = createAsyncThunk(
  'show/search',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${config.url}/shows/search?query=${query}`, { withCredentials: true });

      const normalized = normalize(response.data.entities, [showEntity])
      return normalized
    } catch (err) {
      if (!err.response) throw err; // No response message from backend (probably network failure)
      return rejectWithValue(err.response.data); // Any other type of error
    }
  },
);

export default searchShows;

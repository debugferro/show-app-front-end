import { createAsyncThunk } from '@reduxjs/toolkit';
import { normalize } from 'normalizr'
import axios from 'axios';

import { showEntity } from '../shared/schemas';
import config from './config';

const fetchMostFavoritedShows = createAsyncThunk(
  'show/mostFavorited',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${config.url}/shows?most_favorited`, { withCredentials: true });
      return normalize(response.data.entities, [showEntity])
    } catch (err) {
      if (!err.response) throw err; // No response message from backend (probably network failure)
      return rejectWithValue(err.response.data); // Any other type of error
    }
  },
);

export default fetchMostFavoritedShows;

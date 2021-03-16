import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import config from './config';
import { normalize } from 'normalizr'

import {
  useQuery,
} from "react-query";

// Sign Out Request
import { showEntity } from '../schemas';

const fetchMostFavoritedShows = createAsyncThunk(
  'show/mostFavorited',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${config.url}/shows?most_favorited`, { withCredentials: true });
      const normalized = normalize(response.data.entities, [showEntity])
      return normalized
    } catch (err) {
      if (!err.response) throw err; // No response message from backend (probably network failure)
      return rejectWithValue(err.response.data); // Any other type of error
    }
  },
);

export default fetchMostFavoritedShows;

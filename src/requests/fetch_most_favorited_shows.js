import { createAsyncThunk } from '@reduxjs/toolkit';

import { showEntity } from '../shared/schemas';
import { callAction } from './all_requests';

const fetchMostFavoritedShows = createAsyncThunk(
  'show/mostFavorited',
  async (_, thunkAPI) => {
    return await callAction(undefined, 'get',
      thunkAPI, '/shows?most_favorited', 200, 'shows', [showEntity]);
  },
);

export default fetchMostFavoritedShows;

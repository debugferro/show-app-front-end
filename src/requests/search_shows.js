import { createAsyncThunk } from '@reduxjs/toolkit';

import { showEntity } from '../shared/schemas';
import { callAction } from './all_requests';

const searchShows = createAsyncThunk(
  'show/search',
  async (query, thunkAPI) => {
    return await callAction(undefined, 'get',
      thunkAPI, `/shows/search?query=${query}`, 200, 'shows', [showEntity]
    );
  },
);


export default searchShows;

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import fetchMostFavoritedShows from '../requests/fetch_most_favorited_shows';
import searchShows from '../requests/search_shows';

import { pendingReducer, fullfilledReducer, rejectedReducer } from './shared';

const showsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.title.localeCompare(b.title)
})

const showSlice = createSlice({
  name: 'show',
  initialState: showsAdapter.getInitialState({
    requestStatus: 'idle',
    presentRequestId: undefined,
    errors: [],
  }),
  reducers: {},
  extraReducers: {
    [fetchMostFavoritedShows.pending]: (state, action) => {
      pendingReducer(state, action);
    },
    [fetchMostFavoritedShows.fulfilled]: (state, { meta, payload }) => {
      fullfilledReducer(state, meta, payload.entities.shows, showsAdapter);
    },
    [fetchMostFavoritedShows.rejected]: (state, action) => {
      rejectedReducer(state, action);
    },
    [searchShows.pending]: (state, action) => {
      pendingReducer(state, action);
    },
    [searchShows.fulfilled]: (state, { meta, payload }) => {
      console.log(payload);
      fullfilledReducer(state, meta, payload.entities.shows, showsAdapter);
    },
    [searchShows.rejected]: (state, action) => {
      rejectedReducer(state, action);
    },
  },
});

export default showSlice.reducer;

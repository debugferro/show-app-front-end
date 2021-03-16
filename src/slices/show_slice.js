import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import fetchMostFavoritedShows from '../requests/fetch_most_favorited_shows';
import searchShows from '../requests/search_shows';
import { normalize, schema } from 'normalizr'
import { conforms } from 'lodash';


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
  // {
  //   ids: [],
  //   entities: [],
  //   requestStatus: 'idle',
  //   errors: [],
  //   presentRequestId: undefined,
  // },
  reducers: {},
  extraReducers: {
    [fetchMostFavoritedShows.pending]: (state, action) => {
      if (state.requestStatus === 'idle') {
        state.requestStatus = 'pending';
        state.errors = [];
        state.presentRequestId = action.meta.requestId;
      }
    },
    [fetchMostFavoritedShows.fulfilled]: (state, {meta, payload}) => {
      const { requestId } = meta;
      if (state.requestStatus === 'pending' && state.presentRequestId === requestId) {
        console.log(payload)
        state.requestStatus = 'idle';
        state.presentRequestId = undefined;
        console.log(payload.entities)
        // state.entities = [...state.entities, payload.entities.shows]
        const entities = payload.entities.shows;
        // state.entities = { ...state.entities, ...entities }
        // const ids = Object.keys(payload.entities.shows)
        // state.ids = [...state.ids, ...ids]
        showsAdapter.addMany(state, entities)
      }
    },
    [fetchMostFavoritedShows.rejected]: (state, action) => {
      // Dealing errors. If no payload is informed, then a message will be at least.
      const { requestId } = action.meta;
      if (state.requestStatus === 'pending' && state.presentRequestId === requestId) {
        state.requestStatus = 'idle';
        if (action.payload) {
          state.errors = action.payload.errors;
        } else {
          state.errors = action.error.message;
        }
      }
      state.presentRequestId = undefined;
    },
    [searchShows.pending]: (state, action) => {
      if (state.requestStatus === 'idle') {
        state.requestStatus = 'pending';
        state.errors = [];
        state.presentRequestId = action.meta.requestId;
      }
    },
    [searchShows.fulfilled]: (state, { meta, payload }) => {
      const { requestId } = meta;
      if (state.requestStatus === 'pending' && state.presentRequestId === requestId) {
        console.log(payload)
        console.log(state)
        state.requestStatus = 'idle';
        state.presentRequestId = undefined;
        const entities = payload.entities.shows;
        // state.entities = { ...state.entities, ...entities }
        // const ids = Object.keys(payload.entities.shows)
        // state.ids = [...state.ids, ...ids]
        showsAdapter.addMany(state, entities)
      }
    },
    [searchShows.rejected]: (state, action) => {
      // Dealing errors. If no payload is informed, then a message will be at least.
      const { requestId } = action.meta;
      if (state.requestStatus === 'pending' && state.presentRequestId === requestId) {
        state.requestStatus = 'idle';
        if (action.payload) {
          state.errors = action.payload.errors;
        } else {
          state.errors = action.error.message;
        }
      }
      state.presentRequestId = undefined;
    },
  },
});

export default showSlice.reducer;

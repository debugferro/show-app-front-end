import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import postScheduledShow from '../requests/scheduled_show_post';

import { pendingReducer, fullfilledReducer, rejectedReducer } from './shared';

const scheduledShowsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.scheduled_date.localeCompare(b.scheduled_date)
})

const scheduledShowsSlice = createSlice({
  name: 'scheduled_shows',
  initialState: scheduledShowsAdapter.getInitialState({
    requestStatus: 'idle',
    presentRequestId: undefined,
    errors: [],
  }),
  reducers: {},
  extraReducers: {
    [postScheduledShow.pending]: (state, action) => {
      pendingReducer(state, action);
    },
    [postScheduledShow.fulfilled]: (state, { meta, payload }) => {
      console.log(payload);
      fullfilledReducer(state, meta, payload.entities.scheduled_shows, scheduledShowsAdapter);
    },
    [postScheduledShow.rejected]: (state, action) => {
      rejectedReducer(state, action);
    },
  },
});

export default scheduledShowsSlice.reducer;

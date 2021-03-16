import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import postScheduledShow from '../requests/scheduled_show_post';


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
      if (state.requestStatus === 'idle') {
        state.requestStatus = 'pending';
        state.errors = [];
        state.presentRequestId = action.meta.requestId;
      }
    },
    [postScheduledShow.fulfilled]: (state, { meta, payload }) => {
      const { requestId } = meta;
      if (state.requestStatus === 'pending' && state.presentRequestId === requestId) {
        state.requestStatus = 'idle';
        state.presentRequestId = undefined;

        const entity = payload.entities.scheduled_shows;
        scheduledShowsAdapter.addMany(state, entity)
      }
    },
    [postScheduledShow.rejected]: (state, action) => {
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

export default scheduledShowsSlice.reducer;

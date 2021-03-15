import { createSlice } from '@reduxjs/toolkit';
import requestSignup from '../requests/signup';

const signUpSlice = createSlice({
  name: 'signup',
  initialState: {
    requestStatus: 'idle',
    errors: [],
    presentRequestId: undefined,
  },
  reducers: {},
  extraReducers: {
    [requestSignup.pending]: (state, action) => {
      if (state.requestStatus === 'idle') {
        state.requestStatus = 'pending';
        state.errors = [];
        state.presentRequestId = action.meta.requestId;
      };
    },
    [requestSignup.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.requestStatus === 'pending' && state.presentRequestId === requestId) {
        state.requestStatus = 'idle';
        state.presentRequestId = undefined;
      }
    },
    [requestSignup.rejected]: (state, action) => {
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

export default signUpSlice.reducer;

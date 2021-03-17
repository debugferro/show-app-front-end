import { createSlice } from '@reduxjs/toolkit';
import requestAuthentication from '../requests/authentication';
import logout from '../requests/logout';

import { pendingReducer, rejectedReducer } from './shared';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    entity: {
      username: undefined,
      email: undefined,
      id: undefined,
      is_authenticated: false,
    },
    requestStatus: 'idle',
    errors: [],
    presentRequestId: undefined,
  },
  reducers: {
    authenticate(state, action) {
      state.entity = { ...action.payload.entity }
    }
  },
  extraReducers: {
    [requestAuthentication.pending]: (state, action) => {
      pendingReducer(state, action);
    },
    [requestAuthentication.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      const { payload } = action;
      if (state.requestStatus === 'pending' && state.presentRequestId === requestId) {
        state.requestStatus = 'idle';
        state.entity = { ...payload.entity };
        state.presentRequestId = undefined;
      }
    },
    [requestAuthentication.rejected]: (state, action) => {
      rejectedReducer(state, action)
    },
    [logout.pending]: (state, action) => {
      pendingReducer(state, action)
    },
    [logout.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.requestStatus === 'pending' && state.presentRequestId === requestId) {
        state.requestStatus = 'idle';
        state.entity = {}; state.presentRequestId = undefined;
      }
    },
    [logout.rejected]: (state, action) => {
      rejectedReducer(state, action)
    }
  },
});

export const { authenticate } = userSlice.actions;

export default userSlice.reducer;

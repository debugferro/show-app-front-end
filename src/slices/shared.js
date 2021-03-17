export const pendingReducer = (state, action) => {
  if (state.requestStatus === 'idle') {
    state.requestStatus = 'pending';
    state.erros = [];
    state.presentRequestId = action.meta.requestId;
  }
}

export const rejectedReducer = (state, action) => {
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
}

export const fullfilledReducer = (state, meta, data, adapter) => {
  const { requestId } = meta;
  if (state.requestStatus === 'pending' && state.presentRequestId === requestId) {
    state.requestStatus = 'idle';
    state.presentRequestId = undefined;
    adapter.addMany(state, data)
  }
}

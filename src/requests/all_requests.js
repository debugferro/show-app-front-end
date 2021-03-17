import axios from 'axios';
import { normalize } from 'normalizr'

import config from './config';

export const callAction = async (data = undefined, action, { rejectWithValue, getState, requestId }, url, successCode, storageTarget, entity = undefined) => {
  const { presentRequestId, requestStatus } = getState()[storageTarget];
  console.log('waiting...')
  if (requestStatus !== 'pending' || requestId !== presentRequestId) return;
  console.log('passed!')
  try {
    const credentials = { withCredentials: true };
    const fullUrl = `${config.url}${url}`;
    const axiosArgs = data ? [fullUrl, data, credentials] : [fullUrl, credentials]
    const response = await axios[action].apply(this, axiosArgs);

    if (response.data.status !== successCode) {
      return rejectWithValue(response.data);
    }
    // Checking if is important data to store or not (ex: logout action)
    if (entity) {
      return normalize(response.data[Array.isArray(entity) ? 'entities' : 'entity'], entity)
    } else {
      return response.data;
    }
  } catch (err) {
    // No response message from backend (probably network failure):
    if (!err.response) throw err;
    // Any other type of error message:
    return rejectWithValue(err.response.data);
  }
}

import { createAsyncThunk } from '@reduxjs/toolkit';

import { scheduledShowEntity } from '../shared/schemas';
import { callAction } from './all_requests';

const postScheduledShow = createAsyncThunk(
  'scheduled_show/post',
  async (data, thunkAPI) => {
    const scheduled_show = {
      show_id: data.show.value,
      scheduled_date: data.date.toJSON()
    }
    return await callAction(scheduled_show, 'post',
      thunkAPI, '/scheduled_shows', 200, 'scheduled_shows', scheduledShowEntity
    );
  },
);

export default postScheduledShow;

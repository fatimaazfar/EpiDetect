import axios from 'axios';
import { LOAD_RECORDS, RECORDS_ERROR } from './types';

// Load user records
export const loadRecords = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/me/records');
    dispatch({
      type: LOAD_RECORDS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECORDS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

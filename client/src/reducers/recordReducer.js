import { LOAD_RECORDS, RECORDS_ERROR } from '../actions/types';

const initialState = {
  records: [],
  loading: true,
  error: {}
};

function recordReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_RECORDS:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case RECORDS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}

export default recordReducer;

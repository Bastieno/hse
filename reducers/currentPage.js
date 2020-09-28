import { handleActions } from 'redux-actions';
import { SET_CURRENT_PAGE } from '../constants/actionTypes';

const currentPage = handleActions(
  {
    [SET_CURRENT_PAGE]: (state, action) => action.payload,
  },
  '/'
);

export default currentPage;

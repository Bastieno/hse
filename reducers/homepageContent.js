import { handleActions } from 'redux-actions';
import { SET_HOMEPAGE_CONTENT, LOGOUT } from '../constants/actionTypes';

const homepageContent = handleActions(
  {
    [SET_HOMEPAGE_CONTENT]: (state, action) => action.payload,
    [LOGOUT]: (state, action) => state,
  },
  {}
);

export default homepageContent;

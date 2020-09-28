import { handleActions } from 'redux-actions';
import { SET_HONORIFICS, LOGOUT } from '../constants/actionTypes';

const honorifics = handleActions(
  {
    [SET_HONORIFICS]: (state, action) => action.payload,
    [LOGOUT]: (state, action) => state,
  },
  {}
);

export default honorifics;

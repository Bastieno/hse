import { handleActions } from 'redux-actions';
import { SET_CURRENT_SUBSCRIBER, LOGOUT } from '../constants/actionTypes';

const subscriber = handleActions(
  {
    [SET_CURRENT_SUBSCRIBER]: (state, action) => action.payload,
    [LOGOUT]: (state, action) => ({}),
  },
  {}
);

export default subscriber;

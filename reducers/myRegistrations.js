import { handleActions } from 'redux-actions';
import { SET_USER_REGISTRATIONS, LOGOUT } from '../constants/actionTypes';

const myRegistrations = handleActions(
  {
    [SET_USER_REGISTRATIONS]: (state, action) => action.payload,
    [LOGOUT]: (state, action) => [],
  },
  []
);

export default myRegistrations;

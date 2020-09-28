import { handleActions } from 'redux-actions';
import { SET_CONF_REG_STATUS, LOGOUT } from '../constants/actionTypes';

const conferenceRegistration = handleActions(
  {
    [SET_CONF_REG_STATUS]: (state, action) => action.payload,
    [LOGOUT]: (state, action) => false,
  },
  false
);

export default conferenceRegistration;

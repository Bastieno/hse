import produce from 'immer';
import { handleActions } from 'redux-actions';
import {
  LOGIN,
  SET_CURRENT_SUBSCRIBER,
  SIGNUP,
  SET_SIGNUP_EMAIL,
  ADMIN_LOGIN,
  LOGOUT,
} from '../constants/actionTypes';

const error = handleActions(
  {
    [LOGIN]: produce((state, action) => {
      if (action.error) state[LOGIN] = action.payload.message;
    }),
    [ADMIN_LOGIN]: produce((state, action) => {
      if (action.error) state[ADMIN_LOGIN] = action.payload.message;
    }),
    [SET_CURRENT_SUBSCRIBER]: produce((state, action) => {
      state[LOGIN] = '';
    }),
    [SIGNUP]: produce((state, action) => {
      if (action.error) state[SIGNUP] = action.payload.message;
    }),
    [SET_SIGNUP_EMAIL]: produce((state, action) => {
      state[SIGNUP] = '';
    }),
    [LOGOUT]: produce((state, action) => {
      state[LOGIN] = '';
      state[SIGNUP] = '';
    }),
  },
  {
    [LOGIN]: '',
    [SIGNUP]: '',
  }
);

export default error;

import { handleActions } from 'redux-actions';
import { SET_SIGNUP_EMAIL, LOGOUT } from '../constants/actionTypes';

const signupEmail = handleActions(
  {
    [SET_SIGNUP_EMAIL]: (state, action) => action.payload,
    [LOGOUT]: (state, action) => '',
  },
  ''
);

export default signupEmail;

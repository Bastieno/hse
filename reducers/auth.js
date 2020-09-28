import { handleActions } from 'redux-actions';
import { LOGIN, ADMIN_LOGIN, LOGOUT } from '../constants/actionTypes';

const auth = handleActions(
  {
    [LOGIN]: (state, action) => {
      if (!action.error) {
        return action.payload;
      }
    },
    [ADMIN_LOGIN]: (state, action) => {
      if (!action.error) {
        return action.payload;
      }
    },
    [LOGOUT]: (state, action) => false,
  },
  false
);

export default auth;

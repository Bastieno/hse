import { handleActions } from 'redux-actions';
import { SET_REGISTRATION_CATEGORIES, LOGOUT } from '../constants/actionTypes';

const registrationCategories = handleActions(
  {
    [SET_REGISTRATION_CATEGORIES]: (state, action) => action.payload,
    [LOGOUT]: (state, action) => state,
  },
  {}
);

export default registrationCategories;

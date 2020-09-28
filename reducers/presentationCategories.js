import { handleActions } from 'redux-actions';
import { LOGOUT, SET_PRESENTATION_CATEGORIES } from '../constants/actionTypes';

const presentationCategories = handleActions(
  {
    [SET_PRESENTATION_CATEGORIES]: (state, action) => action.payload,
    [LOGOUT]: (state, action) => state,
  },
  {}
);

export default presentationCategories;

import { CREATE_ABSTRACT, LOGOUT } from '../constants/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case CREATE_ABSTRACT:
      return action.payload;
    case LOGOUT:
      return null;
    default:
      return state;
  }
};

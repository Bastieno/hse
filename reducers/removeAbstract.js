import { REMOVE_ABSTRACT_COMPLETELY, LOGOUT } from '../constants/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case REMOVE_ABSTRACT_COMPLETELY:
      return action.payload;
    case LOGOUT:
      return null;
    default:
      return state;
  }
};

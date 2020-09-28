import { ADMIN_LOGIN, GET_ADMIN, LOGOUT } from '../constants/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case ADMIN_LOGIN: {
      const { status } = action.payload;
      return status == 'completed' ? action.payload.admin : state;
    }

    case GET_ADMIN: {
      return action.payload;
    }

    case LOGOUT:
      return null;

    default:
      return state;
  }
};

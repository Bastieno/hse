import { GET_SUBCRIBER_ABSTRACTS, LOGOUT } from '../constants/actionTypes';

export default (state = { status: '', abstracts: [] }, action) => {
  switch (action.type) {
    case GET_SUBCRIBER_ABSTRACTS:
      return action.payload;
    case LOGOUT:
      return { status: '', abstracts: [] };
    default:
      return state;
  }
};

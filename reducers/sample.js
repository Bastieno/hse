import { SAMPLE } from '../constants/actionTypes';

export default (state = '', action) => {
  switch (action.type) {
    case SAMPLE:
      return action.payload;
    default:
      return state;
  }
};

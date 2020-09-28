import produce from 'immer';
import { handleActions } from 'redux-actions';
import {
  SET_ALL_ABSTRACTS,
  UPDATE_ONE_ABSTRACT_STATUS,
  UPDATE_MANY_ABSTRACTS_STATUS,
  LOGOUT,
} from '../constants/actionTypes';

const allAbstracts = handleActions(
  {
    [SET_ALL_ABSTRACTS]: (state, action) => action.payload,
    [UPDATE_ONE_ABSTRACT_STATUS]: produce((state, action) => {
      const { newStatus, remark, abstractId } = action.payload;

      state[abstractId].status = newStatus;
      state[abstractId].remark = remark;
    }),
    [UPDATE_MANY_ABSTRACTS_STATUS]: produce((state, action) => {
      const { status, remark, abstractIds } = action.payload;

      console.log('Abstract Ids', abstractIds);

      abstractIds.forEach(abstractId => {
        state[abstractId].status = status;
        state[abstractId].remark = remark;
      });
    }),
    [LOGOUT]: (state, action) => ({}),
  },
  {}
);

export default allAbstracts;

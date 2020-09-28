import produce from 'immer';
import { handleActions } from 'redux-actions';
import { API_START, API_END, LOGOUT } from '../constants/actionTypes';
import {
  GET_HOMEPAGE_CONTENT,
  GET_USER_REGISTRATIONS,
  GET_ALL_ABSTRACTS,
  CHANGE_ONE_ABSTRACT_STATUS,
  CHANGE_MANY_ABSTRACTS_STATUS,
  APPROVE_USER_PAYMENT,
} from '../constants/labels';

const isLoading = handleActions(
  {
    [API_START]: produce((state, action) => {
      if (action.payload === GET_HOMEPAGE_CONTENT) {
        state[GET_HOMEPAGE_CONTENT] = true;
      }

      if (action.payload === GET_USER_REGISTRATIONS) {
        state[GET_USER_REGISTRATIONS] = true;
      }

      if (action.payload === APPROVE_USER_PAYMENT) {
        state[APPROVE_USER_PAYMENT] = true;
      }

      if (action.payload === GET_ALL_ABSTRACTS) {
        state[GET_ALL_ABSTRACTS] = true;
      }

      if (action.payload === CHANGE_ONE_ABSTRACT_STATUS) {
        state[CHANGE_ONE_ABSTRACT_STATUS] = true;
      }

      if (action.payload === CHANGE_MANY_ABSTRACTS_STATUS) {
        state[CHANGE_MANY_ABSTRACTS_STATUS] = true;
      }
    }),
    [API_END]: produce((state, action) => {
      if (action.payload === GET_HOMEPAGE_CONTENT) {
        state[GET_HOMEPAGE_CONTENT] = false;
      }

      if (action.payload === GET_USER_REGISTRATIONS) {
        state[GET_USER_REGISTRATIONS] = false;
      }

      if (action.payload === APPROVE_USER_PAYMENT) {
        state[APPROVE_USER_PAYMENT] = false;
      }

      if (action.payload === GET_ALL_ABSTRACTS) {
        state[GET_ALL_ABSTRACTS] = false;
      }

      if (action.payload === CHANGE_ONE_ABSTRACT_STATUS) {
        state[CHANGE_ONE_ABSTRACT_STATUS] = false;
      }

      if (action.payload === CHANGE_MANY_ABSTRACTS_STATUS) {
        state[CHANGE_MANY_ABSTRACTS_STATUS] = false;
      }
    }),
    [LOGOUT]: (state, action) => state,
  },
  {
    [GET_HOMEPAGE_CONTENT]: true,
    [GET_USER_REGISTRATIONS]: true,
    [APPROVE_USER_PAYMENT]: false,
    [GET_ALL_ABSTRACTS]: true,
    [CHANGE_ONE_ABSTRACT_STATUS]: false,
    [CHANGE_MANY_ABSTRACTS_STATUS]: false,
  }
);

export default isLoading;

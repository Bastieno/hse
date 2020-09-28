import * as conferenceRegistration from '../services/conferenceRegistration';
import { apiStartActionCreator, apiEndActionCreator } from '../actions/api';
import {
  CREATE_CONFERENCE_REGISTRATION,
  GET_USER_REGISTRATIONS,
  APPROVE_USER_PAYMENT
} from '../constants/labels';
import {
  SET_CONF_REG_STATUS,
  SET_USER_REGISTRATIONS,
} from '../constants/actionTypes';

const setUserRegistrations = regs => {
  return { type: SET_USER_REGISTRATIONS, payload: regs };
};

export const createConferenceRegistration = participant => {
  const setConfRegStatus = status => {
    return {
      type: SET_CONF_REG_STATUS,
      payload: status,
    };
  };

  return async (dispatch, getState) => {
    try {
      const { data } = await conferenceRegistration.create(participant);
      if (data.status.code === '00') dispatch(setConfRegStatus(true));
    } catch (error) {
      console.log('Conference Registration: ', error);
      dispatch(setConfRegStatus(false));
    }
  };
};

export const getUserRegistrations = userId => {
  return async (dispatch, getState) => {
    dispatch(apiStartActionCreator(GET_USER_REGISTRATIONS));

    try {
      const { data } = await conferenceRegistration.getUserRegistrations(
        userId
      );

      if (data.status.code === '00') dispatch(setUserRegistrations(data.regs));
    } catch (error) {
      console.log('Get User Registrations: ', error);
    }

    dispatch(apiEndActionCreator(GET_USER_REGISTRATIONS));
  };
};

export const approveUserPayment = paymentInfo => {
  return async (dispatch, getState) => {
    dispatch(apiStartActionCreator(APPROVE_USER_PAYMENT));

    try {
      await conferenceRegistration.approveUserPayment(paymentInfo);

    } catch (error) {
      console.log('Approve User Payment Error: ', error);
    }

    dispatch(apiEndActionCreator(APPROVE_USER_PAYMENT));
  };
};

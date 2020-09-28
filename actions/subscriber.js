import { batch } from 'react-redux';
import { createAction } from 'redux-actions';
import {
  LOGIN,
  SET_CURRENT_SUBSCRIBER,
  SIGNUP,
  SET_SIGNUP_EMAIL,
  ADMIN_LOGIN,
  LOGOUT,
  GET_CURRENT_SUBSCRIBER,
  GET_ADMIN,
} from '../constants/actionTypes';
import * as subscriber from '../services/subscriber';
import { capitalizeWord } from '../helpers/formatters';

const setUser = userDetails => {
  return {
    type: SET_CURRENT_SUBSCRIBER,
    payload: userDetails,
  };
};

export const login = credentials => {
  return async (dispatch, getState) => {
    const loginAC = createAction(LOGIN);

    try {
      const { data } = await subscriber.login(credentials);

      if (['05', '07'].includes(data.status.code)) {
        batch(() => {
          dispatch(loginAC(false));
          dispatch(loginAC(new Error(data.status.desc)));
        });
      }

      const user = data.subscriber;
      const firstName = capitalizeWord(user.firstName);
      const lastName = capitalizeWord(user.lastName);

      if (data.status.code === '00') {
        batch(() => {
          dispatch(loginAC('true'));
          dispatch(setUser({ ...user, firstName, lastName, type: 'USER' }));
        });
      }
    } catch (error) {
      dispatch(loginAC(false));
    }
  };
};

export const signup = user => {
  const setSignupEmail = email => {
    return {
      type: SET_SIGNUP_EMAIL,
      payload: email,
    };
  };

  return async (dispatch, getState) => {
    const signupAC = createAction(SIGNUP);

    try {
      const { data } = await subscriber.signup(user);

      if (data.code === '02') {
        dispatch(
          signupAC(
            new Error('Email already exist. Use a different email address.')
          )
        );
      }

      if (data.code === '00') {
        dispatch(setSignupEmail(user.email));
      }
    } catch (error) {
      console.log('Signup: ', error);
    }
  };
};

export const loginAdmin = credentials => {
  const adminLoginAC = createAction(ADMIN_LOGIN);

  return async (dispatch, getState) => {
    try {
      const { data } = await subscriber.adminLogin(credentials);

      if (data.status.code === '05') {
        batch(() => {
          dispatch(adminLoginAC(false));
          dispatch(adminLoginAC(new Error(data.status.desc)));
        });
      }

      const admin = data.subscriber;
      const firstName = capitalizeWord(admin.firstName);
      const lastName = capitalizeWord(admin.lastName);

      if (data.status.code === '00') {
        batch(() => {
          dispatch(adminLoginAC('true'));
          dispatch(setUser({ ...admin, firstName, lastName, type: 'ADMIN' }));
        });
      }
    } catch (error) {
      dispatch(adminLoginAC(false));
    }
  };
};

export const logout = () => {
  return { type: LOGOUT };
};

export const getCurrentSubscriber = () => ({
  type: GET_CURRENT_SUBSCRIBER,
  payload: subscriber.getCurrent(),
});

export const getAdmin = () => ({
  type: GET_ADMIN,
  payload: subscriber.getAdmin(),
});

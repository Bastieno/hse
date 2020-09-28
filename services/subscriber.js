import axios from 'axios';

export const login = ({ email, password }) => {
  return axios.post('/Subscripber/Login', {
    emailAddress: email,
    password,
  });
};

export const signup = ({ firstName, lastName, phoneNum, email, password }) => {
  return axios.post('/Subscripber/Create', {
    firstName,
    lastName,
    phoneNum,
    emailAddress: email,
    password,
  });
};

export const adminLogin = ({ email, password }) => {
  return axios.post('/Admin/Login', {
    emailAddress: email,
    password,
  });
};

export const getCurrent = () => {
  return JSON.parse(localStorage.getItem('subscriber'));
};

export const verifyAccount = token => {
  return axios.get(`/Subscripber/ValidateAccount/${token}`);
};

export const sendResetPasswordRequest = ({ email: emailAddress }) => {
  return axios.put('/Subscripber/ResetPasswordRequest', {
    emailAddress,
  });
};

export const resetPassword = data => {
  return axios.put('/Subscripber/ResetPassword', data);
};

export const getAdmin = () => {
  return JSON.parse(localStorage.getItem('admin'));
};

export default {
  signup,
  login,
  getCurrent,
  verifyAccount,
  sendResetPasswordRequest,
  resetPassword,
  adminLogin,
  getAdmin,
};

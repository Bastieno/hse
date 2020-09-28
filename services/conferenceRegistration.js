import axios from 'axios';

export const create = participant => {
  return axios.post('/Reg/Registration/Create', participant);
};

export const getUserRegistrations = userId => {
  return axios.get(`/Reg/GetRegistration/List/User/${userId}`);
};

export const getAllRegistrations = () => {
  return axios.get('/Reg/GetRegistration/List');
};

export const deleteUserRegistration = registrationId => {
  return axios.delete(`/Reg/Delete/${registrationId}`);
};

export const approveUserPayment = paymentInfo => {
  return axios.put('/Reg/Registration/Payment', paymentInfo);
}

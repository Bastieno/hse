import axios from 'axios';

export const getHonorifics = () => {
  return axios.get('/Lookup/Title');
};

export const getHomepageContent = () => {
  return axios.get('/WebContent/HomeContent');
};

export const getPresentationCategories = () => {
  return axios.get('/Lookup/PresentationCat');
};

export const getRegistrationCategories = () => {
  return axios.get('/Reg/GetRegCategory/List');
};

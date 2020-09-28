import { combineReducers } from 'redux';
import error from './error';
import isLoading from './isLoading';
import auth from './auth';
import signupEmail from './signupEmail';
import admin from './admin';
import subscriber from './subscriber';
import createAbstract from './createAbstract';
import myAbstracts from './myAbstracts';
import allAbstracts from './allAbstracts';
import abstractStatusUpdate from './abstractStatusUpdate';
import removeAbstract from './removeAbstract';
import currentPage from './currentPage';
import honorifics from './honorifics';
import homepageContent from './homepageContent';
import presentationCategories from './presentationCategories';
import registrationCategories from './registrationCategories';
import conferenceRegistration from './conferenceRegistration';
import myRegistrations from './myRegistrations';

const rootReducer = combineReducers({
  error,
  isLoading,
  auth,
  signupEmail,
  admin,
  subscriber,
  createAbstract,
  myAbstracts,
  allAbstracts,
  abstractStatusUpdate,
  removeAbstract,
  honorifics,
  currentPage,
  homepageContent,
  presentationCategories,
  registrationCategories,
  conferenceRegistration,
  myRegistrations,
});

export default rootReducer;

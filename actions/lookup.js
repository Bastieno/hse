import { normalize, schema } from 'normalizr';
import * as lookup from '../services/lookup';
import { apiStartActionCreator, apiEndActionCreator } from '../actions/api';
import { GET_HOMEPAGE_CONTENT } from '../constants/labels';
import {
  SET_HONORIFICS,
  SET_CURRENT_PAGE,
  SET_HOMEPAGE_CONTENT,
  SET_PRESENTATION_CATEGORIES,
  SET_REGISTRATION_CATEGORIES,
} from '../constants/actionTypes';

const lookupsNormalizedData = (data, entityName) => {
  const entitySchema = new schema.Entity(
    entityName,
    {},
    { idAttribute: 'valueField' }
  );

  const entitiesSchema = [entitySchema];

  return normalize(data, entitiesSchema).entities[entityName];
};

export const getHonorifics = () => {
  const setHonorifics = honorifics => {
    return {
      type: SET_HONORIFICS,
      payload: lookupsNormalizedData(honorifics, 'honorifics'),
    };
  };

  return async (dispatch, getState) => {
    try {
      const { data } = await lookup.getHonorifics();
      dispatch(setHonorifics(data.lookups));
    } catch (error) {}
  };
};

export const setCurrentPage = pageUrl => {
  return { type: SET_CURRENT_PAGE, payload: pageUrl };
};

export const getHomepageContent = () => {
  const setHomepageContent = content => {
    return { type: SET_HOMEPAGE_CONTENT, payload: content };
  };

  return async (dispatch, getState) => {
    dispatch(apiStartActionCreator(GET_HOMEPAGE_CONTENT));

    try {
      const { data } = await lookup.getHomepageContent();
      dispatch(setHomepageContent(data.content));
    } catch (error) {}

    dispatch(apiEndActionCreator(GET_HOMEPAGE_CONTENT));
  };
};

export const getPresentationCategories = () => {
  const setPresentationCategories = categories => {
    return {
      type: SET_PRESENTATION_CATEGORIES,
      payload: lookupsNormalizedData(categories, 'presentationCategories'),
    };
  };

  return async (dispatch, getState) => {
    try {
      const { data } = await lookup.getPresentationCategories();
      dispatch(setPresentationCategories(data.lookups));
    } catch (error) {}
  };
};

export const getRegistrationCategories = () => {
  const setRegistrationCategories = categories => {
    const categorySchema = new schema.Entity(
      'registrationCategories',
      {},
      { idAttribute: 'code' }
    );

    const categoriesSchema = [categorySchema];

    return {
      type: SET_REGISTRATION_CATEGORIES,
      payload: normalize(categories, categoriesSchema).entities
        .registrationCategories,
    };
  };

  return async (dispatch, getState) => {
    try {
      const { data } = await lookup.getRegistrationCategories();
      dispatch(setRegistrationCategories(data.categories));
    } catch (error) {}
  };
};

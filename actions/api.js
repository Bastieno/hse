import { createAction } from 'redux-actions';
import { API_START, API_END } from '../constants/actionTypes';

export const apiStartActionCreator = createAction(API_START);
export const apiEndActionCreator = createAction(API_END);

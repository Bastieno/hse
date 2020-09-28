import { normalize, schema } from 'normalizr';
import abstract from '../services/abstract';
import { apiStartActionCreator, apiEndActionCreator } from '../actions/api';
import {
  GET_ALL_ABSTRACTS,
  CHANGE_ONE_ABSTRACT_STATUS,
  CHANGE_MANY_ABSTRACTS_STATUS,
} from '../constants/labels';
import {
  CREATE_ABSTRACT,
  SET_ALL_ABSTRACTS,
  GET_SUBCRIBER_ABSTRACTS,
  UPDATE_ABSTRACT_CONTENT,
  UPDATE_ONE_ABSTRACT_STATUS,
  UPDATE_MANY_ABSTRACTS_STATUS,
  REMOVE_ABSTRACT_COMPLETELY,
} from '../constants/actionTypes';

export const createAbstract = details => {
  const actionCreator = payload => ({ type: CREATE_ABSTRACT, payload });

  return async (dispatch, getState) => {
    try {
      const { data } = await abstract.create(details);

      if (data.code === '00') {
        dispatch(actionCreator({ status: 'completed' }));
      }

      if (data.desc === 'Record exists') {
        dispatch(
          actionCreator({
            status: 'failed',
            error:
              'The abstract you tried to submit already exists in our record',
          })
        );
      }
    } catch (error) {
      if (error.response && error.response.status == 400) {
        dispatch(
          actionCreator({ status: 'failed', error: error.response.data })
        );
      }
    }
  };
};

export const getAllAbstracts = () => {
  const setAllAbstracts = abstractList => {
    const abstractSchema = new schema.Entity('abstracts');
    const abstractsSchema = [abstractSchema];

    return {
      type: SET_ALL_ABSTRACTS,
      payload: normalize(abstractList, abstractsSchema).entities.abstracts,
    };
  };

  return async (dispatch, getState) => {
    dispatch(apiStartActionCreator(GET_ALL_ABSTRACTS));

    try {
      const { data } = await abstract.getAllAbstracts();
      dispatch(setAllAbstracts(data.abstracts));
    } catch (error) {
      console.log('Error: ', error);
      console.log('Error.code: ', error.code);
    }

    dispatch(apiEndActionCreator(GET_ALL_ABSTRACTS));
  };
};

export const getSubscriberAbstracts = subscriberId => {
  const actionCreator = payload => ({ type: GET_SUBCRIBER_ABSTRACTS, payload });

  return async (dispatch, getState) => {
    try {
      const { data } = await abstract.getUserAbstracts(subscriberId);

      if (data.status.code === '00') {
        dispatch(
          actionCreator({ status: 'completed', abstracts: data.abstracts })
        );
      }
    } catch (error) {
      if (error.response && error.response.status == 400) {
        dispatch(
          actionCreator({ status: 'failed', error: error.response.data })
        );
      }
    }
  };
};

export const updateAbstractContent = abstractId => {
  const actionCreator = payload => ({ type: UPDATE_ABSTRACT_CONTENT, payload });

  return async (dispatch, getState) => {
    try {
      const { data } = await abstract.updateAbstract(abstractId);

      if (data.code === '00') {
        dispatch(
          actionCreator({ status: 'completed', abstracts: data.abstracts })
        );
      }
    } catch (error) {
      if (error.response && error.response.status == 400) {
        dispatch(
          actionCreator({ status: 'failed', error: error.response.data })
        );
      }
    }
  };
};

export const changeOneAbstractStatus = ({ newStatus, remark, abstractId }) => {
  const updateAbstractStatus = payload => {
    return {
      type: UPDATE_ONE_ABSTRACT_STATUS,
      payload,
    };
  };

  return async (dispatch, getState) => {
    dispatch(apiStartActionCreator(CHANGE_ONE_ABSTRACT_STATUS));

    try {
      const requestData = {
        newStatus,
        remark,
        abstractId,
      };

      const { data } = await abstract.changeOneAbstractStatus(requestData);

      if (data.code === '00') {
        dispatch(updateAbstractStatus(requestData));
      }
    } catch (error) {}

    dispatch(apiEndActionCreator(CHANGE_ONE_ABSTRACT_STATUS));
  };
};

export const changeManyAbstractsStatus = ({ status, remark, abstractIds }) => {
  const updateAbstractsStatus = payload => {
    return {
      type: UPDATE_MANY_ABSTRACTS_STATUS,
      payload,
    };
  };

  return async (dispatch, getState) => {
    dispatch(apiStartActionCreator(CHANGE_MANY_ABSTRACTS_STATUS));

    try {
      const { data } = await abstract.changeManyAbstractsStatus({
        status,
        remark,
        abstractIds,
      });

      if (data.code === '00') {
        dispatch(updateAbstractsStatus({ status, remark, abstractIds }));
      }
    } catch (error) {}

    dispatch(apiEndActionCreator(CHANGE_MANY_ABSTRACTS_STATUS));
  };
};

export const removeAbstractCompletely = abstractId => {
  const actionCreator = payload => ({
    type: REMOVE_ABSTRACT_COMPLETELY,
    payload,
  });

  return async (dispatch, getState) => {
    try {
      const { data } = await abstract.removeAbstractCompletely(abstractId);

      if (data.code == '00') {
        dispatch(actionCreator({ status: 'completed' }));
      }
    } catch (error) {
      if (error.response && error.response.status == 400) {
        dispatch(
          actionCreator({ status: 'failed', error: error.response.data })
        );
      }
    }
  };
};

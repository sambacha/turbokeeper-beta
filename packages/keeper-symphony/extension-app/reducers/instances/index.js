import {
  GET_INSTANCES,
  GET_INSTANCES_SUCCESS,
  GET_INSTANCES_FAILURE,
} from './types';

const INITIAL_STATE = {
  instances: null,
  loading: true,
  error: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_INSTANCES:
      return {
        ...state,
        instances: null,
        loading: true,
        error: null,
      };
    case GET_INSTANCES_SUCCESS:
      return {
        ...state,
        instances: action.payload,
        loading: false,
        error: null,
      };
    case GET_INSTANCES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

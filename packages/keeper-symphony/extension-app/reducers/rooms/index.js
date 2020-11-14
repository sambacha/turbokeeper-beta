import {
  GET_ROOMS,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_FAILURE,
} from './types';

const INITIAL_STATE = {
  services: null,
  loading: false,
  error: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ROOMS:
      return {
        ...state,
        rooms: null,
        loading: true,
        error: null,
      };
    case GET_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: action.payload.map(({ stream_id, name }) => ({
          threadId: stream_id,
          name,
        })),
        loading: false,
        error: null,
      };
    case GET_ROOMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

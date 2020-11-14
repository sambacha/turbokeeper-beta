import Api from 'services/api';
import {
  GET_ROOMS,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_FAILURE,
} from './types';

export function getBackendRooms() {
  return (dispatch) => {
    dispatch({ type: GET_ROOMS });
    return Api.get('v1/sym/rooms')
      .then(res => dispatch({ type: GET_ROOMS_SUCCESS, payload: res.data }))
      .catch(error => dispatch({ type: GET_ROOMS_FAILURE, payload: error.data }));
  };
}

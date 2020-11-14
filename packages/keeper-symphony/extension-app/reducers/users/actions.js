import { getUserRooms, getUserContacts } from 'services/user';
import { filterAllowedRooms } from 'utils/helpers/help-functions';
import {
  JWT_AUTH_SUCCESS,
  JWT_AUTH_FAILURE,
  GET_ALL_USER_ROOMS_SUCCESS,
  GET_ALL_USER_ROOMS_FAILURE,
  GET_ALLOWED_USER_ROOMS_SUCCESS,
  GET_ALLOWED_USER_ROOMS_FAILURE,
  GET_USER_CONTACTS,
  GET_USER_CONTACTS_ERROR,
} from './types';

export function getJWTFromSymphony(jwtService) {
  if (!jwtService) {
    return (dispatch) => {
      dispatch({
        type: JWT_AUTH_SUCCESS,
        payload: 'No JWT',
      });
    };
  }

  return dispatch => jwtService.getJwt()
    .then((jwt) => {
      dispatch({
        type: JWT_AUTH_SUCCESS,
        payload: jwt,
      });
    })
    .catch(() => {
      dispatch({
        type: JWT_AUTH_FAILURE,
        payload: undefined,
      });
    });
}

export function getAllUserRooms() {
  return dispatch => getUserRooms().then(rooms => dispatch({
    type: GET_ALL_USER_ROOMS_SUCCESS,
    payload: rooms,
  }))
    .catch(error => dispatch({
      type: GET_ALL_USER_ROOMS_FAILURE,
      payload: error,
    }));
}

export function getAllowedUserRooms() {
  return dispatch => getUserRooms().then(rooms => dispatch({
    type: GET_ALLOWED_USER_ROOMS_SUCCESS,
    payload: filterAllowedRooms(rooms),
  }))
    .catch(error => dispatch({
      type: GET_ALLOWED_USER_ROOMS_FAILURE,
      payload: error,
    }));
}

export function fetchUserContacts(roomId) {
  return dispatch => getUserContacts(roomId).then(contacts => dispatch({
    type: GET_USER_CONTACTS,
    payload: contacts,
  }))
    .catch(error => dispatch({
      type: GET_USER_CONTACTS_ERROR,
      payload: error,
    }));
}

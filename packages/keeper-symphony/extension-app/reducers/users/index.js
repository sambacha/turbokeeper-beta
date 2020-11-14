import { RestClient } from 'symphony-bdk-ui-toolkit';
import { simplifyRooms } from 'utils/helpers/help-functions';
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

const INITIAL_STATE = {
  allUserRooms: null,
  allowedUserRooms: null,
  jwt: 'loading',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    // JWT
    case JWT_AUTH_SUCCESS:
      RestClient.setJwt(action.payload);
      return {
        ...state,
        jwt: action.payload,
      };
    case JWT_AUTH_FAILURE:
      return {
        ...state,
        jwt: undefined,
      };
    // ROOMS
    case GET_ALL_USER_ROOMS_SUCCESS:
      return {
        ...state,
        allUserRooms: simplifyRooms(action.payload),
      };
    case GET_ALL_USER_ROOMS_FAILURE:
      return {
        ...state,
        allUserRooms: null,
      };
    case GET_ALLOWED_USER_ROOMS_SUCCESS:
      return {
        ...state,
        allowedUserRooms: simplifyRooms(action.payload),
      };
    case GET_ALLOWED_USER_ROOMS_FAILURE:
      return {
        ...state,
        allowedUserRooms: null,
      };
    case GET_USER_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case GET_USER_CONTACTS_ERROR:
      return {
        ...state,
        contacts: [],
      };
    default:
      return state;
  }
}

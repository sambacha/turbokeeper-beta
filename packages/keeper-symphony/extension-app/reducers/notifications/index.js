import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
  POST_NOTIFICATION,
  POST_NOTIFICATION_SUCCESS,
  POST_NOTIFICATION_FAILURE,
  DELETE_NOTIFICATIONS,
  DELETE_NOTIFICATIONS_SUCCESS,
  DELETE_NOTIFICATIONS_FAILURE,
  PUT_NOTIFICATION,
  PUT_NOTIFICATION_SUCCESS,
  PUT_NOTIFICATION_FAILURE,
} from './types';

const INITIAL_STATE = {
  notifications: null,
  loading: true,
  error: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS:
    case POST_NOTIFICATION:
    case DELETE_NOTIFICATIONS:
    case PUT_NOTIFICATION:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload.map(el => ({
          name: el.name,
          id: el.id,
          isEditable: el.is_editable,
          instanceId: el.instance_id,
        })),
        loading: false,
        error: null,
      };
    case POST_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          action.payload,
        ],
        loading: false,
        error: null,
      };
    case PUT_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.map((el) => {
          if (el.id === action.payload.id) {
            return {
              ...el,
              name: action.payload.name,
              instanceId: action.payload.instanceId,
            };
          }
          return el;
        }),
        loading: false,
        error: null,
      };
    case DELETE_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.filter(el => el.id !== action.payload),
        loading: false,
        error: null,
      };
    case GET_NOTIFICATIONS_FAILURE:
    case POST_NOTIFICATION_FAILURE:
    case DELETE_NOTIFICATIONS_FAILURE:
    case PUT_NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

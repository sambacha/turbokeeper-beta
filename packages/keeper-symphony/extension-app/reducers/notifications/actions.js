import { RestClient } from 'symphony-bdk-ui-toolkit';
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

const ROOT_URL = 'v1/notifications';

export function getNotifications() {
  return (dispatch) => {
    dispatch({ type: GET_NOTIFICATIONS });
    return RestClient.get(ROOT_URL)
      .then(res => dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: res.data }))
      .catch(error => dispatch({ type: GET_NOTIFICATIONS_FAILURE, payload: error.data }));
  };
}

export function postNotification(notification) {
  return (dispatch) => {
    dispatch({ type: POST_NOTIFICATION });
    return RestClient.post(ROOT_URL, {
      name: notification.name,
      instance_id: notification.instanceId,
    })
      .then(res => dispatch({
        type: POST_NOTIFICATION_SUCCESS,
        payload: {
          ...notification,
          isEditable: true,
          id: res.data,
        },
      }))
      .catch(error => dispatch({ type: POST_NOTIFICATION_FAILURE, payload: error.data }));
  };
}

export function deleteNotification(notificationId) {
  return (dispatch) => {
    dispatch({ type: DELETE_NOTIFICATIONS });
    return RestClient.delete(`${ROOT_URL}/${notificationId}`)
      .then(() => dispatch({
        type: DELETE_NOTIFICATIONS_SUCCESS,
        payload: notificationId,
      }))
      .catch(error => dispatch({ type: DELETE_NOTIFICATIONS_FAILURE, payload: error.data }));
  };
}

export function editNotification(notification) {
  return (dispatch) => {
    dispatch({ type: PUT_NOTIFICATION });
    return RestClient.put(`${ROOT_URL}/${notification.id}`, {
      name: notification.name,
      is_editable: notification.isEditable,
      id: notification.id,
      instance_id: notification.instanceId,
    })
      .then(() => dispatch({
        type: PUT_NOTIFICATION_SUCCESS,
        payload: notification,
      }))
      .catch(error => dispatch({ type: PUT_NOTIFICATION_FAILURE, payload: error.data }));
  };
}

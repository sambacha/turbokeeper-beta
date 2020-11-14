/* global SYMPHONY */

export function getUserRooms() {
  return new Promise((resolve, reject) => {
    SYMPHONY.services.subscribe('extended-user-service').getRooms()
      .then(userRooms => resolve(userRooms))
      .catch(() => reject(new Error('No response from Symphony UI extended-user-Service in getting rooms')))
      .finally(() => SYMPHONY.services.unsubscribe('extended-user-service'));
  });
}

export function getUserContacts(roomId) {
  return new Promise((resolve, reject) => {
    SYMPHONY.getContacts(roomId)
      .then(contacts => resolve(contacts))
      .catch(() => reject(new Error('No response from Symphony UI extended-user-Service in getting rooms')))
      .finally(() => SYMPHONY.services.unsubscribe('extended-user-service'));
  });
}

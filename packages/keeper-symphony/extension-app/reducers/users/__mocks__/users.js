import {
  GET_ALLOWED_USER_ROOMS_SUCCESS,
  GET_USER_CONTACTS,
} from '../types';

export const rawRooms = [
  {
    id: '0',
    name: 'Room A',
    threadId: 'abc/def//ghi+jkl==',
    memberAddUserEnabled: true,
    userIsOwner: true,
    publicRoom: false,
  },
  {
    id: '1',
    name: 'Room B',
    threadId: 'abc/def//ghi+123==',
    memberAddUserEnabled: false,
    userIsOwner: false,
    publicRoom: false,
  },
  {
    id: '2',
    name: 'Room C',
    threadId: 'abc/def//ghi+456==',
    memberAddUserEnabled: true,
    userIsOwner: false,
    publicRoom: true,
  },
];

const userContacts = new Map();
const jeanLuc = {
  id: 0,
  name: 'Cpt. Jean Luc Picard',
};

const riker = {
  id: 1,
  name: '1st officer William Riker',
};

const laforge = {
  id: 3,
  name: 'Chief Engineer Lt. La forge',
};

const cmderData = {
  id: 2,
  name: '2nd Officer LT commander Data',
};

userContacts.set('abc_def__ghi-jkl', [jeanLuc, cmderData]);
userContacts.set('abc_def__ghi-123', [jeanLuc]);
userContacts.set('abc_def__ghi-456', [jeanLuc, riker, cmderData, laforge]);

export function getAllowedUserRooms() {
  return {
    type: GET_ALLOWED_USER_ROOMS_SUCCESS,
    payload: rawRooms,
  };
}

export function fetchUserContacts(roomId) {
  return {
    type: GET_USER_CONTACTS,
    payload: userContacts.get(roomId),
  };
}

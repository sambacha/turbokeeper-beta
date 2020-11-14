import Reducer from '..';
import {
  GET_ROOMS,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_FAILURE,
} from '../types';

const initialState = {
  rooms: null,
  loading: false,
  error: null,
};

const mockPayload = [
  { stream_id: '123123', name: 'Room 1' },
  { stream_id: '123456', name: 'Room 2' },
];

const parsedRooms = [
  { threadId: '123123', name: 'Room 1' },
  { threadId: '123456', name: 'Room 2' },
];

describe('Room reducer', () => {
  it('Should return the initial state', () => {
    expect(Reducer(initialState, {})).toEqual(initialState);
  });

  it('Should handle GET_ROOMS', () => {
    const action = {
      type: GET_ROOMS,
    };

    const state = {
      rooms: null,
      loading: true,
      error: null,
    };

    expect(Reducer(initialState, action)).toEqual(state);
  });

  it('Should handle GET_ROOMS_SUCCESS', () => {
    const action = {
      type: GET_ROOMS_SUCCESS,
      payload: mockPayload,
    };

    const state = {
      rooms: parsedRooms,
      loading: false,
      error: null,
    };

    expect(Reducer(initialState, action)).toEqual(state);
  });

  it('Should handle GET_ROOMS_FAILURE', () => {
    const action = {
      type: GET_ROOMS_FAILURE,
      payload: mockPayload,
    };

    const state = {
      rooms: null,
      loading: false,
      error: mockPayload,
    };

    expect(Reducer(initialState, action)).toEqual(state);
  });
});

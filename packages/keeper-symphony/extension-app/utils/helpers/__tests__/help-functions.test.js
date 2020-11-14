import { rawRooms as mockedRooms } from 'reducers/users/__mocks__/users';
import {
  parseStreamIdToBackend,
  generateStringOfStreamIds,
  filterAllowedRooms,
  simplifyRooms,
  openNewWindowSafely,
  handleOutline,
} from '../help-functions';

describe('Util functions', () => {
  describe('Function "parseStreamIdToBackend"', () => {
    it('Should handle empty StreamId', () => {
      const parsedStreamId = parseStreamIdToBackend('');
      expect(parsedStreamId).toEqual(undefined);
    });

    it('Should parse StreamId to backend format', () => {
      const parsedStreamId = parseStreamIdToBackend('abc/def//ghi+jkl==');
      expect(parsedStreamId).toEqual('abc_def__ghi-jkl');
    });
  });

  describe('Function "generateStringOfStreamIds"', () => {
    let rooms;

    beforeEach(() => {
      rooms = mockedRooms.map(room => ({ ...room }));
    });

    it('Function "generateStringOfStreamIds" should handle situation without rooms', () => {
      expect(generateStringOfStreamIds(null)).toEqual('');
    });

    it('Function "generateStringOfStreamIds" should generate a string list with StreamIds (already parsed to backend)', () => {
      const streamIdsString = 'abc_def__ghi-jkl,abc_def__ghi-123,abc_def__ghi-456';
      expect(generateStringOfStreamIds(rooms)).toEqual(streamIdsString);
    });
  });

  describe('Function "filterAllowedRooms"', () => {
    let rooms;

    beforeEach(() => {
      rooms = mockedRooms.map(room => ({ ...room }));
    });

    it('Function "filterAllowedRooms" should handle situation without rooms', () => {
      expect(filterAllowedRooms(null)).toEqual(null);
    });

    it('Function "filterAllowedRooms" should filter rooms by user permission', () => {
      const filtered = [
        {
          id: '0',
          name: 'Room A',
          threadId: 'abc/def//ghi+jkl==',
          memberAddUserEnabled: true,
          userIsOwner: true,
          publicRoom: false,
        },
      ];

      expect(filterAllowedRooms(rooms)).toEqual(filtered);
    });
  });

  describe('Function "simplifyRooms"', () => {
    let rooms;

    beforeEach(() => {
      rooms = mockedRooms.map(room => ({ ...room }));
    });

    it('Function "simplifyRooms" should handle situation without rooms', () => {
      expect(simplifyRooms(null)).toEqual(null);
    });

    it('Function "simplifyRooms" should simplify room object', () => {
      const simplified = [
        {
          name: 'Room A',
          threadId: 'abc_def__ghi-jkl',
        },
        {
          name: 'Room B',
          threadId: 'abc_def__ghi-123',
        },
        {
          name: 'Room C',
          threadId: 'abc_def__ghi-456',
        },
      ];

      expect(simplifyRooms(rooms)).toEqual(simplified);
    });
  });

  describe('Function "openNewWindowSafely"', () => {
    global.window.open = jest.fn(() => ({ opener: 'main window' }));

    it('Should open new tab with URL and set opener="null"', () => {
      openNewWindowSafely('http://www.symphony.com');
      expect(global.window.open).toHaveBeenCalledWith('http://www.symphony.com');
      expect(global.window.open).toReturnWith({ opener: null });
    });
  });

  describe('Function "handleOutline"', () => {
    const originalEventListener = window.addEventListener;

    it('Should start listenning to "keydown" event', () => {
      window.addEventListener = jest.fn();
      handleOutline();

      expect(window.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
      window.addEventListener = originalEventListener;
    });

    it('Should handle a sequence of "tab" key and mouse click', () => {
      handleOutline();

      // simulate the "tab"
      const tabEvent = new KeyboardEvent('keydown', { keyCode: 9 });
      window.dispatchEvent(tabEvent);

      expect(document.body.classList[0]).toEqual('tab-clicked');

      // simulate the mouse click
      const clickEvent = new MouseEvent('mousedown');
      window.dispatchEvent(clickEvent);

      expect(document.body.classList.length).toEqual(0);
    });
  });
});

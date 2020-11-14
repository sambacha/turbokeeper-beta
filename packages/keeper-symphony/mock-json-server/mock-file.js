// Use this file to generated the fake data.

/*
  -- DEMO
  Demo mock information, for the purpose of showing a full react-redux flow.
  It can - and should - be deleted when developing your own integration.
*/
function generateDemoInfo() {
  return [
    {
      id: 9,
      name: 'Jiló',
      isFruit: false,
      actionsMenu: [{
        label: 'Edit',
        callback: (item) => {
          console.log('Item', item);
        },
        type: 'primary',
      }],
    },
    { id: 1, name: 'Açaí', isFruit: true },
    { id: 2, name: 'Pitaya', isFruit: true },
    { id: 7, name: 'Moranga', isFruit: false },
    { id: 5, name: 'Pitanga', isFruit: true },
    { id: 0, name: 'Guarana', isFruit: true },
    { id: 10, name: 'Maxixe', isFruit: false },
    { id: 6, name: 'Cará', isFruit: false },
    { id: 4, name: 'Sapoti', isFruit: true },
    { id: 8, name: 'Chuchu', isFruit: false },
    { id: 3, name: 'Graviola', isFruit: true },
  ];
}

function getBotRooms() {
  return [
    { name: 'Bot Room A', stream_id: 'streamID01' },
    { name: 'Bot Room B', stream_id: 'streamID02' },
    { name: 'Bot Room C', stream_id: 'streamID03' },
  ];
}

const mockInstances = [{
  name: 'Main instance',
  url: 'https://main.instance.com',
  id: '1',
}, {
  name: 'Premised instance',
  url: 'https://premised.instance.com',
  id: '2',
}];

const initMockNotifications = [{
  name: 'Ali',
  instance_id: '1',
  is_editable: true,
  id: '1',
}, {
  name: 'Barry',
  instance_id: '2',
  is_editable: false,
  id: '2',
}, {
  name: 'Carrie',
  instance_id: '1',
  is_editable: true,
  id: '3',
}];

module.exports = {
  generateDemoInfo, getBotRooms, mockInstances, initMockNotifications,
};

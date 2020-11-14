export function parseStreamIdToBackend(streamId) {
  if (!streamId) {
    return undefined;
  }

  return streamId.replace(/\//g, '_').replace(/=/g, '').replace(/\+/g, '-');
}

export function generateStringOfStreamIds(rooms) {
  if (rooms == null) return '';

  const mappedStreamId = rooms.map(room => parseStreamIdToBackend(room.threadId));

  // generate a string with streamIds separated by comma
  return mappedStreamId.reduce((acc, cur, curIndex) => (curIndex ? `${acc},${cur}` : cur), '');
}

export function filterAllowedRooms(rooms) {
  // filter by rooms that the user can add members and that are private
  if (rooms == null) return null;

  return rooms.filter(room => !room.publicRoom && (room.memberAddUserEnabled || room.userIsOwner));
}

export function simplifyRooms(rooms) {
  // simplify room object
  if (rooms == null) return null;

  return rooms.map(room => ({
    name: room.name,
    threadId: parseStreamIdToBackend(room.threadId),
  }));
}

export function openNewWindowSafely(url) {
  const newWindow = window.open(url);
  newWindow.opener = null;
}

export function handleOutline() {
  function handleFirstTab(e) {
    if (e.keyCode === 9) {
      document.body.classList.add('tab-clicked');
      window.removeEventListener('keydown', handleFirstTab);
      window.addEventListener('mousedown', handleFirstMouseDown);
    }
  }

  function handleFirstMouseDown() {
    document.body.classList.remove('tab-clicked');

    window.removeEventListener('mousedown', handleFirstMouseDown);
    window.addEventListener('keydown', handleFirstTab);
  }

  window.addEventListener('keydown', handleFirstTab);
}

export function parseSimilarUrl(url) {
  if (!url) {
    return url;
  }
  let parsedUrl = url.toLowerCase().replace(/\s/g, '');
  if (parsedUrl.includes('/www.')) {
    parsedUrl = parsedUrl.replace('www.', '');
  }
  if (parsedUrl.indexOf('https') === 0) {
    parsedUrl = parsedUrl.replace('https://', '');
  }
  if (parsedUrl.indexOf('http') === 0) {
    parsedUrl = parsedUrl.replace('http://', '');
  }
  if (parsedUrl[parsedUrl.length - 1] === '/') {
    parsedUrl = parsedUrl.slice(0, -1);
  }

  return parsedUrl;
}

export function getInstanceFromIncident(url, incidentId) {
  return url.replace(`/incidents/${incidentId}`, '');
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

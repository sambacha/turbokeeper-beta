/* global SYMPHONY */
export default function removeSymphonyModal(id) {
  const dialogsService = SYMPHONY.services.subscribe('dialogs');
  dialogsService.close(id);
}

export function buildModalUrl(url, injectObject) {
  return injectObject
    ? `${url}/app.html?queryObj=${encodeURIComponent(JSON.stringify(injectObject))}`
    : `${url}/app.html`;
}

export function openModal(
  id,
  serviceName,
  url,
  modalSize,
  injectObject = null,
) {
  const dialogsService = SYMPHONY.services.subscribe('dialogs');
  const fullURL = buildModalUrl(url, injectObject);

  dialogsService.show(
    id,
    serviceName,
    `<dialog><iframe height="${modalSize}" width="100%" src="${fullURL}" ></iframe></dialog>`,
    undefined,
    {},
  );
}

/* global SYMPHONY */
import '../../../../public/config';
import { setupLinkPrefix, frontendURL } from 'utils/system/setup-url';
import { showExtensionApp } from 'services/controller/extension-app';

const { APP_ID, APP_TITLE, APP_ICON_NAME } = window.APP_CONFIG;


describe('Extension App Services', () => {
  const showMock = jest.fn();
  const TEMPLATE_URL = 'https://localhost:4000/template';

  global.SYMPHONY = {
    services: {
      subscribe: jest.fn(() => ({
        show: showMock,
      })),
    },
  };

  it('Should subscribe to SYMPHONY modules and get default config if no override', () => {
    showExtensionApp();
    expect(SYMPHONY.services.subscribe).toBeCalledWith('modules');
    expect(showMock).toBeCalledWith(
      APP_ID,
      { title: APP_TITLE, icon: `${frontendURL()}${setupLinkPrefix()}/assets/${APP_ICON_NAME}` },
      `${APP_ID}:controller`,
      `${frontendURL()}${setupLinkPrefix()}/app.html`,
      { canFloat: true },
    );
  });

  it('Should subscribe to SYMPHONY modules and with override URL', () => {
    showExtensionApp(null, TEMPLATE_URL);
    expect(SYMPHONY.services.subscribe).toBeCalledWith('modules');
    expect(showMock).toBeCalledWith(
      APP_ID,
      { title: APP_TITLE, icon: `${frontendURL()}${setupLinkPrefix()}/assets/${APP_ICON_NAME}` },
      `${APP_ID}:controller`,
      TEMPLATE_URL,
      { canFloat: true },
    );
  });

  it('Should subscribe to SYMPHONY modules and with two override URLs', () => {
    showExtensionApp(null, TEMPLATE_URL, TEMPLATE_URL);
    expect(SYMPHONY.services.subscribe).toBeCalledWith('modules');
    expect(showMock).toBeCalledWith(
      APP_ID,
      { title: APP_TITLE, icon: TEMPLATE_URL },
      `${APP_ID}:controller`,
      TEMPLATE_URL,
      { canFloat: true },
    );
  });
});

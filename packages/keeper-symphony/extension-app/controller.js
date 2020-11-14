/* global SYMPHONY */
/* global APP_CONFIG */

import Index from 'services/controller/authentication';
import { frontendURL, setupURL, setupLinkPrefix } from 'utils/system/setup-url';
import GeneralEnricher from 'services/enrichers/general-enricher';
import { ENRICHER_EVENTS, MODAL_IDS } from 'services/enrichers/entities';
import { RestClient } from 'symphony-bdk-ui-toolkit';
import { showExtensionApp } from 'services/controller/extension-app';
import { parseStreamIdToBackend } from 'utils/helpers/help-functions';
import { openModal } from 'services/modal-service';

const { APP_ID, APP_NAV_BAR_TITLE, APP_ICON_NAME } = window.APP_CONFIG;
// These next 4 lines will be removed on production
/* develblock:start */
window.ENRICHER_EVENTS = ENRICHER_EVENTS;
window.MODAL_IDS = MODAL_IDS;
/* develblock:end */

const controllerService = SYMPHONY.services.register(`${APP_ID}:controller`);
SYMPHONY.services.register(`${APP_ID}:enricher`);
const controllers = [`${APP_ID}:controller`, `${APP_ID}:enricher`];
const FRONTEND_SERVE_URL = frontendURL();
const LINK_PREFIX = setupLinkPrefix();
const AUTH_URL = setupURL();

const config = {
  appId: APP_ID,
  dependencies: [
    'modules',
    'applications-nav',
    'ui',
    'entity',
    'dialogs',
    'extended-user-info',
  ],
  exportedDependencies: controllers,
  baseAuthenticationUrl: AUTH_URL,
};

RestClient.setBaseConfig({ baseUrl: APP_CONFIG.API_ROOT_URL, headers: {}, jwt: null });

const authController = new Index(config);

const bootstrap = () => {
  const modulesService = SYMPHONY.services.subscribe('modules');
  const navService = SYMPHONY.services.subscribe('applications-nav');
  const uiService = SYMPHONY.services.subscribe('ui');
  SYMPHONY.services.subscribe('entity');
  const extendedUserInfoService = SYMPHONY.services.subscribe(
    'extended-user-info',
  );
  extendedUserInfoService.getJwt().then((jwt) => {
    RestClient.setJwt(jwt);
    RestClient.get('/v1/sym/rooms').then((response) => {
      window.botRooms = response.data;
    });
    RestClient.get('/v1/sym/bot-info').then((response) => {
      window.botUsername = response.data.username;
    });
  });
  const enricher = new GeneralEnricher(`${APP_ID}:enricher`);
  enricher.init();
  enricher.register();

  const navSettings = {
    title: APP_NAV_BAR_TITLE,
    icon: `${FRONTEND_SERVE_URL}${LINK_PREFIX}/assets/${APP_ICON_NAME}`,
  };
  navService.add(`${APP_ID}-nav`, navSettings, `${APP_ID}:controller`);
  uiService.registerExtension('app-settings', APP_ID, `${APP_ID}:controller`, {
    label: 'Configure',
  });

  // UI extensions, for buttons EXAMPLE
  uiService.registerExtension(
    'single-user-im',
    'buy-im',
    controllers[0],
    {
      label: 'Example In Chat button',
      icon: `${FRONTEND_SERVE_URL}${LINK_PREFIX}/assets/${APP_ICON_NAME}`,
      data: {},
    },
  );

  controllerService.implement({
    select(id) {
      if (id === `${APP_ID}-nav`) {
        navService.focus(`${APP_ID}-nav`);
      }
      showExtensionApp();
      modulesService.focus(APP_ID);
    },
    filter(type, id, data) {
      const parsedThreadId = parseStreamIdToBackend(data.threadId);
      switch (id) {
        case 'buy-im':
          return data.user.username === window.botUsername;
        default:
          return false;
      }
    },
    trigger(uiClass, id, payload, data) {
      switch (id) {
        case 'buy-im':
          openModal(
            MODAL_IDS.CURRENCY_QUOTE_MODAL.entity,
            controllers[0],
            `${FRONTEND_SERVE_URL}${LINK_PREFIX}`,
            '260px',
            { page: MODAL_IDS.CURRENCY_QUOTE_MODAL.entity },
          );
          break;
        default:
          break;
      }
    },
  });
};

authController
  .init()
  .then(() => bootstrap())
  .catch(e => console.error(e));

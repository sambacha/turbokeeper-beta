/* global SYMPHONY */
/* global APP_CONFIG */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  THEME_TYPES, Logger, RestClient,
} from 'symphony-bdk-ui-toolkit';
import configureStore from './reducers';
import Routes from './pages/routes';
import { handleOutline } from './utils/helpers/help-functions';
import './public/sass/main.scss';
import '../node_modules/symphony-bdk-ui-toolkit/dist/index.css';

const { APP_ID, APP_TITLE } = window.APP_CONFIG;

Logger.setEnv({
  appTitle: 'Template extension app',
  environment: 'DEV',
  apiUrl: null,
  debugLevel: 1,
});

RestClient.setBaseConfig({ baseUrl: APP_CONFIG.API_ROOT_URL, headers: {}, jwt: null });

handleOutline(); // Accessibility

let MOCK_USER_SERVICE = null;

const appWrapper = async () => {
  // These next lines will be removed on production
  /* develblock:start */
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  MOCK_USER_SERVICE = {
    getJwt: () => new Promise(Resolve => Resolve('NO JWT')),
  };
  for (let i = 0; i < 10; i++) {
    console.log('Waiting for Symphony Mock...', i);
    if (window.SYMPHONY.remote.isMock) {
      console.log('Appjs Found it!');
      break;
    }
    await sleep(15);
  }
  console.log('APPJS GOT', window.SYMPHONY);
  /* develblock:end */

  const appService = SYMPHONY.services.register(`${APP_ID}:app`);

  SYMPHONY.remote.hello().then((data) => {
    const themeSize = data.themeV2.size;
    const themeColor = data.themeV2.name;
    document.body.className = `symphony-external-app ${themeColor} ${themeSize}`;
    const appTheme = themeColor.toUpperCase() === THEME_TYPES.DARK
      ? THEME_TYPES.DARK
      : themeColor.toUpperCase() === THEME_TYPES.LIGHT
        ? THEME_TYPES.LIGHT
        : THEME_TYPES.LIGHT;
    window.themeColor = appTheme;
    window.themeSize = themeSize;

    SYMPHONY.application.connect(
      APP_ID,
      ['modules', 'applications-nav', 'ui', 'extended-user-info', 'extended-user-service', 'dialogs'],
      [`${APP_ID}:app`],
    ).then((response) => {
      const userId = response.userReferenceId;
      const modulesService = SYMPHONY.services.subscribe('modules');
      const extendedUserInfoService = SYMPHONY.services.subscribe('extended-user-info');

      modulesService.addMenuItem(APP_ID, `About ${APP_TITLE}`, `${APP_ID}-menu-item`);
      modulesService.setHandler(APP_ID, `${APP_ID}:app`);
      appService.implement({
        menuSelect: (itemId) => {
          if (itemId === `${APP_ID}-menu-item`) {
            document.getElementById(`about-${APP_ID}-app`).className = '';
          }
        },
      });
      const store = configureStore();
      ReactDOM.render(
        <Provider store={store}>
          <Routes userId={userId} jwtService={extendedUserInfoService || MOCK_USER_SERVICE} />
        </Provider>, document.getElementById('root'),
      );
    }).catch((error) => {
      throw new Error('Unable to connect the application on client', error);
    });
  }).catch((error) => {
    throw new Error('Unable to reach the data for Extension App, please verify the Authentication with Server', error);
  });
};

appWrapper();

/* global APP_CONFIG */
import envs from './envs-constants';

const setupURL = () => {
  const { currEnv } = process.env;
  let ROOT_URL = '';

  if (currEnv === envs.MOCK) {
    // Using JSON Server
    ROOT_URL = 'http://localhost:3000';
  } else if (currEnv === envs.DEV) {
    // BE with another source
    ROOT_URL = process.env.backendUrl || APP_CONFIG.API_EXT_URL;
  } else {
    ROOT_URL = APP_CONFIG.API_ROOT_URL;
  }
  return ROOT_URL;
};

const setupLinkPrefix = () => {
  const { currEnv } = process.env;
  let LINK_PREFIX = '';

  if (currEnv === envs.PROD) {
    // eslint-disable-next-line prefer-destructuring
    LINK_PREFIX = APP_CONFIG.LINK_PREFIX;
  }
  return LINK_PREFIX;
};

const frontendURL = () => {
  const { currEnv } = process.env;

  if (currEnv !== envs.PROD) {
    return 'https://localhost:4000';
  }
  return APP_CONFIG.APP_ROOT_URL;
};

export { setupURL, setupLinkPrefix, frontendURL };

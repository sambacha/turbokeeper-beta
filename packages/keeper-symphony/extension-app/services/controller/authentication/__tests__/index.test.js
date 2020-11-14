/* global SYMPHONY */

import Index from '../index';

describe('An Authentication Controller', () => {
  const config = {
    appId: 'APP_ID',
    dependencies: ['modules', 'applications-nav', 'ui', 'entity', 'dialogs'],
    exportedDependencies: ['APP_ID:controller', 'APP_ID:enricher'],
    baseAuthenticationUrl: 'https://localhost/AUTH_URL',
  };

  global.SYMPHONY = {
    application: {
      register: jest.fn(() => (
        config
      )),
    },
    remote: {
      hello: jest.fn(() => new Promise(resolve => resolve([]))),
    },
  };

  it('Should call SYMPHONY remote hello upon auth configs ', () => {
    const auth = new Index(config);

    auth.init();
    expect(global.SYMPHONY.remote.hello).toHaveBeenCalled();
  });

  it('Should return a "Fail to register" upon error during remote.hello() function running', () => {
    global.SYMPHONY = {
      application: {
        register: jest.fn(() => (
          config
        )),
      },
      remote: {
        hello: jest.fn(jest.fn(() => new Promise(reject => reject()))),
      },
    };
    const auth = new Index(config);

    auth.init().catch((error) => {
      expect(error).toEqual('Fail to register application APP_ID');
    });
  });

  it('Should call SYMPHONY register upon constructor configs', () => {
    const auth = new Index(config);
    const appTokens = {
      data: {
        appToken: 'Token',
      },
    };

    const results = {
      tokens: { appId: 'APP_ID', tokenA: 'Token' },
      dependencies: ['modules', 'applications-nav',
        'ui', 'entity', 'dialogs', 'extended-user-info'],
      exportedDependencies: ['APP_ID:controller', 'APP_ID:enricher'],
    };

    auth.registerAuthenticatedApp(appTokens);

    expect(SYMPHONY.application.register).toBeCalledWith(
      results.tokens, results.dependencies, results.exportedDependencies,
    );
  });
});

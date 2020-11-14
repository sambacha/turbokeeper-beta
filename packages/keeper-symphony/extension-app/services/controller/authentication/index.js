/* global SYMPHONY */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import AuthApiCaller from '../api-caller';

export default class Authentication {
  constructor({
    appId, dependencies, exportedDependencies, baseAuthenticationUrl,
  }) {
    this.appId = appId;
    this.dependencies = dependencies;
    this.exportedDependencies = exportedDependencies;
    this.authApiCaller = new AuthApiCaller(baseAuthenticationUrl);

    if (!dependencies.find(el => el === 'extended-user-info')) {
      this.dependencies = [...dependencies, 'extended-user-info'];
    } else this.dependencies = dependencies;
  }

  authenticate = () => this.authApiCaller.authenticate(this.appId);

  registerAuthenticatedApp = (appTokens) => {
    this.tokenA = appTokens.data.appToken;
    const tokens = {
      appId: this.appId,
      tokenA: this.tokenA,
    };
    return SYMPHONY.application.register(tokens, this.dependencies, this.exportedDependencies);
  }

  validateAppTokens = symphonyToken => this.authApiCaller.validateTokens(
    this.tokenA,
    symphonyToken.tokenS,
    this.appId,
  );

  getJwtFromSymph = () => SYMPHONY.services.subscribe('extended-user-info').getJwt();

  validateJwtToken = jwt => this.authApiCaller.validateJwt(jwt)

  init() {
    return SYMPHONY.remote.hello()
      .then(this.authenticate)
      .then(this.registerAuthenticatedApp)
      .then(this.validateAppTokens)
      .then(this.getJwtFromSymph)
      .then(this.validateJwtToken)
      .catch((e) => {
        console.error(`Fail to register application ${this.appId}`);
        throw e;
      });
  }
}

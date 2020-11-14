import axios from 'axios';

export default class ApiCaller {
  constructor(baseUrl) {
    this.baseAuthUrl = `${baseUrl}/application`;
  }

  authenticate(appId) {
    return axios.post(
      `${this.baseAuthUrl}/authenticate`,
      { appId },
    );
  }

  validateTokens(appToken, symphonyToken, appId) {
    return axios.post(
      `${this.baseAuthUrl}/tokens/validate`,
      { appToken, symphonyToken, appId },
    );
  }

  validateJwt(jwt) {
    return axios.post(
      `${this.baseAuthUrl}/jwt/validate`,
      { jwt },
    );
  }
}

import Moment     from 'moment';


export default (() => {
  'use strict';

  const ADSPECTER_AUTH_TOKEN_KEY = `adspecter_auth_token`;
  const ADSPECTER_CURRENT_USER_KEY = `adspecter_current_user`;
  const ADSPECTER_START_TIME_KEY = `adspecter_session_start_time`;

  return {
    getAuthToken() {
      return localStorage.getItem(ADSPECTER_AUTH_TOKEN_KEY);
    },

    getCurrentUser() {
      return JSON.parse(localStorage.getItem(ADSPECTER_CURRENT_USER_KEY));
    },

    isLoggedIn() {
      return !!this.getCurrentUser();
    },

    create(user, token) {
      this.setCurrentUser(user);
      this.setAuthToken(token);

      console.log('auth token', this.getAuthToken());
      console.log('current user', this.getCurrentUser());
    },

    destroy() {
      localStorage.removeItem(ADSPECTER_START_TIME_KEY);
      localStorage.removeItem(ADSPECTER_AUTH_TOKEN_KEY);
      localStorage.removeItem(ADSPECTER_CURRENT_USER_KEY);
    },

    setStartTime() {
      localStorage.setItem(ADSPECTER_START_TIME_KEY, Moment().format());
    },

    isSessionExpired() {
      const startTime = localStorage.getItem(ADSPECTER_START_TIME_KEY);

      return startTime ? Moment(startTime).add(100, 'minutes').isBefore(Moment().format()) : true;
    },


    // PRIVATE METHODS


    setAuthToken(token) {
      localStorage.setItem(ADSPECTER_AUTH_TOKEN_KEY, token);
    },

    setCurrentUser(user) {
      localStorage.setItem(ADSPECTER_CURRENT_USER_KEY, JSON.stringify(user));
    }
  };
})();

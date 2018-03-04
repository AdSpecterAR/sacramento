import Moment     from 'moment';


export default (() => {
  'use strict';

  const ADSPECTER_AUTH_TOKEN_KEY = `adspecter_auth_token`;
  const ADSPECTER_CURRENT_USER_KEY = `adspecter_current_user`;
  const ADSPECTER_START_TIME_KEY = `adspecter_session_start_time`;
  // const PEER_SESSION_CONFIG_KEY = `${window.PEER_API_APP_HOST}_peer_app_config`;
  // const PEER_SESSION_FEED_NOTIFICATION_COUNT_KEY = `${window.PEER_API_APP_HOST}_peer_app_session_feed_notification_count`;
  // const PEER_SESSION_CHECKINS_NOTIFICATION_COUNT_KEY = `${window.PEER_API_APP_HOST}_peer_app_session_checkins_notification_count`;

  // let notificationCountUpdateHandler;

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
    //
    // setConfig(config) {
    //   localStorage.setItem(PEER_SESSION_CONFIG_KEY, JSON.stringify(config));
    // },
    //
    // getConfig() {
    //   return JSON.parse(localStorage.getItem(PEER_SESSION_CONFIG_KEY));
    // },
    //
    // setCheckInsNotificationCount(count) {
    //   localStorage.setItem(PEER_SESSION_CHECKINS_NOTIFICATION_COUNT_KEY, count);
    //
    //   Broadcast.publish('Layout.updateCheckInsCount', count);
    // },
    //
    // getCheckInsNotificationCount() {
    //   return localStorage.getItem(PEER_SESSION_CHECKINS_NOTIFICATION_COUNT_KEY);
    // },


    // PRIVATE METHODS


    setAuthToken(token) {
      localStorage.setItem(ADSPECTER_AUTH_TOKEN_KEY, token);
    },

    setCurrentUser(user) {
      localStorage.setItem(ADSPECTER_CURRENT_USER_KEY, JSON.stringify(user));
    }
  };
})();

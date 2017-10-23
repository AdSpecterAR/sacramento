import Ajax from './ajax';
import _    from 'underscore';

export default (() => {
  const API_ENDPOINTS = [

    // USERS

    {
      name: 'getCurrentUser',
      type: 'GET',
      url: '/users/get_current_user/'
    }, {
      name: 'userSignUp',
      type: 'POST',
      url: '/users/'
    }
  ];

  // TODO: finish API service
  return API_ENDPOINTS.reduce((API, endpoint) => {
      API[endpoint.name] = function(...args) {
        return Ajax.request(this.createRequestOptions(endpoint, ...args));
      };

      return API;
    },


    // PRIVATE METHODS


    {
      createRequestOptions(endpoint, ...args) {
        let baseOptions = _.pick(endpoint, 'type', 'isLoop', 'isAuthUrl');

        switch (endpoint.type) {
          case 'POST':
          case 'PUT':
          case 'DELETE':
            return _.extend(
              baseOptions,
              this.createURL(endpoint, args[0]),
              {data: args[0]}
            );
          default:
            return _.extend(
              baseOptions,
              this.createURL(endpoint, args[0])
            );
        }
      },

      createURL(endpoint, options) {
        switch (typeof endpoint.url) {
          case 'string':
            return {url: `${endpoint.url}`};

          case 'function':
            const value = endpoint.id.split('.').reduce((prevObj, key) => {
              return prevObj[key];
            }, options);

            return {url: `${endpoint.url(value)}`};
          default:
            break;
        }
      }
    });
})();

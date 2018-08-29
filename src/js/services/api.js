import Ajax         from './ajax';
import Session      from './session';
import _            from 'underscore';


export default (() => {
  const API_ENDPOINTS = [

    // USERS

    {
      name: 'getCurrentUser',
      type: 'GET',
      url: '/users/get_current_user/',
      authTokenRequired: true,
      checkSessionStart: true
    },
    {
      name: 'login',
      type: 'POST',
      url: '/users/sign_in'
    },
    {
      name: 'registerNewUser',
      type: 'POST',
      url: '/register_new_user'
    },
    {
      name: 'registerNewInstructor',
      type: 'POST',
      url: '/admin/register_new_instructor'
    },
    {
      name: 'createCourse',
      type: 'POST',
      url: '/admin/create_course'
    },
    {
      name: 'createCourseSession',
      type: 'POST',
      url: '/admin/create_course_session'
    },
    {
      name: 'facebookAuth',
      type: 'POST',
      url: '/facebook_authentication'
    },
    {
      name: 'postCharge',
      type: 'POST',
      url: '/charges'
    },
    {
      name: 'postSubscription',
      type: 'POST',
      url: '/subscribe'
    },
    {
      name: 'getUpcomingCourses',
      type: 'GET',
      url: '/upcoming_courses'
    },
    {
      name: 'getUserCourseSession',
      type: 'GET',
      id: 'query',
      url: (query) => `/users/${query.userId}/course_sessions/${query.courseSessionId}`
    },
    {
      name: 'getCourseSessionStudents',
      type: 'GET',
      id: 'id',
      url: (id) => `/course_sessions/${id}/users`
    },
    {
      name: 'submitCourseFeedback',
      type: 'POST',
      id: 'user_course_session_id',
      url: id => `/user_course_sessions/${id}/feedback`
    },
    {
      name: 'getInstructors',
      type: 'GET',
      url: '/get_instructors'
    },
    {
      name: 'getUsers',
      type: 'GET',
      url: '/get_users'
    },
    {
      name: 'getCourses',
      type: 'GET',
      url: '/get_courses'
    }
  ];

  // TODO: finish API service
  return API_ENDPOINTS.reduce((API, endpoint) => {
      if (endpoint.checkSessionStart) {
        API[endpoint.name] = function (...args) {
          return this.checkSessionStart(Ajax.request(this.createRequestOptions(endpoint, ...args)))
            .catch(this.handleUnauthorizedRequest(API));
        };

      } else {
        API[endpoint.name] = function (...args) {
          return Ajax.request(this.createRequestOptions(endpoint, ...args))
            .catch(this.handleUnauthorizedRequest(API));
        };
      }

      return API;
    },


    // PRIVATE METHODS


    {

      authorization() {
        return {
          Authorization: `Bearer ${Session.getAuthToken()}`
        };
      },

      checkSessionStart(promise) {
        if (Session.isSessionExpired()) {
          Session.setStartTime();

          // add backend endpoint to start session
        }

        return promise;
      },

      createCustomHeaders({authTokenRequired}) {
        let headers = {};

        if (authTokenRequired) {
          _.extend(headers, this.authorization());
        }

        return {headers};
      },

      handleUnauthorizedRequest() {
        return (request) => {
          if (request.status === 401) {
            console.log('UNAUTHORIZED REQUEST!!!');
            // window.location.href = '/sign-out'
          }
        };
      },

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

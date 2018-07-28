export default (() => {
  return {
    request(options) {
      return new Promise(this.createRequest(options))
        .then(JSON.parse)
    },

    createRequest(options) {
      return (resolve, reject) => {
        let request = new XMLHttpRequest();
        //let baseURL = 'http://localhost:3000'; // TODO: CHANGE TO BE DYNAMIC BY ENV AND IN CHECKOUTFORM FOR STRIPE
         // TODO: CHANGE TO BE DYNAMIC BY ENV

        let baseURL = 'https://sunrise-staging-1.herokuapp.com';

          /*
           switch(process.env.ENV_HEROKU) {
             case 'dev':
               let baseURL = 'https://sunrise-dev.herokuapp.com';
               break;
             case 'staging':
               baseURL = 'https://sunrise-staging-1.herokuapp.com';
               break;
             case 'production':
               baseURL = 'https://sunrise-production.herokuapp.com';
               break;
         }*/

        console.log(process.env);
        switch(process.env.ENV_HEROKU) {
          case 'dev':
            let baseURL = 'https://sunrise-dev.herokuapp.com';
            break;
          case 'staging':
            baseURL = 'https://sunrise-staging-1.herokuapp.com';
            break;
          case 'production':
            baseURL = 'https://sunrise-production.herokuapp.com';
            break;
        }
        console.log(baseURL);

        let url = baseURL + options.url;

        request.open(options.type, url);

        request.onload = this.createOnLoadCallback(request, resolve, reject);
        // request.withCredentials = true;

        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Accept', 'application/json');
        request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        this.sendRequest(request, options);
      }
    },

    sendRequest(request, {data}) {
      if (data) {
        return request.send(JSON.stringify(data));
      }

      return request.send();
    },

    createOnLoadCallback(request, resolve, reject) {
      return () => {
        return request.status === 200 || request.status === 201
          ? resolve(request.response)
          : reject(request);
      };
    }
  };
})();

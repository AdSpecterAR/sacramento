import React, { Component }     from 'react';
import { Redirect }             from 'react-router-dom';
import API                      from './api';
import Session                  from './session';
import history                  from '../services/history';


export default class FacebookAuth extends Component {

  constructor(props) {
    super(props);

    this.checkLoginState = this.checkLoginState.bind(this);
    this.handleFBLogin = this.handleFBLogin.bind(this);
  }

  componentDidMount() {
    this.loadFbLoginApi();
  }

  render() {
    return (
      <div>
        <div>
          <button
            onClick={this.handleFBLogin}
            type="button"
            className="btn btn-primary waves-effect w-md waves-light m-b-5 m-t-20"
          >
            Facebook login
          </button>

          {/*{this.renderFBButton()}*/}
        </div>

        <div>
          <button
            onClick={() => window.FB.logout()}
            type="button"
            className="btn btn-primary waves-effect w-md waves-light m-b-5 m-t-20"
          >
            Log out
          </button>
        </div>
      </div>
    );
  }


  //================
  // RENDER METHODS
  //================


  renderFBButton() {
    return (
      <div
        className="fb-login-button"
        data-max-rows="1"
        data-size="large"
        data-button-type="continue_with"
        data-show-faces="true"
        data-auto-logout-link="false"
        data-use-continue-as="true"
        data-onlogin={this.checkLoginState}
        data-scope="email,public_profile"
      >
      </div>
    );
  }


  //================
  // EVENT HANDLERS
  //================


  loadFbLoginApi() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '287435505152197',
        cookie     : true,  // enable cookies to allow the server to access
        // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.5' // use version 2.1
      });
    };

    console.log("Loading fb api");
    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  testAPI(userID, authToken) {
    console.log('Welcome!  Fetching your information.... ');
    window.FB.api(`/${userID}?fields=email,first_name,last_name,name`, function(response) {
      console.log('RESPONSE HAHAHAHAHA: ' + response);
      console.log('email: ' + response.email);
      console.log('id: ' + response.id);
      console.log('Successful login for: ' + response.name);
      console.log('first name: ' + response.first_name);
      console.log('last name: ' + response.last_name);
      // document.getElementById('status').innerHTML =
      //   'Thanks for logging in, ' + response.name + '!';

      let {
        email,
        first_name,
        last_name,
        id
      } = response;

      let userPostData = {
        user: {
          first_name,
          last_name,
          email,
          fb_user_id: userID,
          fb_authentication_token: authToken.toString()
        }
      };

      API.facebookAuth(userPostData)
        .then(({user}) => {
          Session.create(user, user.fb_auth_token);

          // return (<Redirect push to="/"/>);
          history.push("/");
          window.location.reload();
        });
    });
  }

  checkLoginState() {
    window.FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }

  handleFBLogin() {
    window.FB.login(this.checkLoginState(), {scope: 'email', return_scopes: true});
  }


  //=================
  // PRIVATE METHODS
  //=================


  constructFBAuthData(userData, authToken) {
    let {
      email,
      first_name,
      last_name,
      id
    } = userData;

    return {
      user: {
        first_name,
        last_name,
        email,
        fb_user_id: id,
        fb_auth_token: authToken
      }
    }
  }

  statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log('RESPONSE YO!', response);
    if (response.status === 'connected') {
      this.testAPI(response.authResponse.userID, response.authResponse.accessToken);
    } else if (response.status === 'not_authorized') {
      console.log("Please log into this app.");
    } else {
      console.log("Please log into this facebook.");
    }
  }
}
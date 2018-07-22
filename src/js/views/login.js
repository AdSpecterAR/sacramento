import React, { Component }     from 'react';
import {
  withRouter,
  Redirect
}                               from 'react-router-dom';
import API                      from '../services/api';
import Session                  from '../services/session';


class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      redirectToReferrer: false,
      shouldShowErrorMessages: false,
    };

    this.login = this.login.bind(this);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.handleFBLogin = this.handleFBLogin.bind(this);
  }

  componentDidMount() {
    this.loadFbLoginApi();
    // this.loadFBAPI();

  }

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

      API.facebookAuth(this.constructFBAuthData(response, authToken))
        .then(({user}) => {
          this.loginSuccessHandler(user);
        });
    });
  }

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


      // TODO: post to server!
      Session.setAuthToken(response.authResponse.authToken);



      this.testAPI(response.authResponse.userID, response.authResponse.authToken);
    } else if (response.status === 'not_authorized') {
      console.log("Please log into this app.");
    } else {
      console.log("Please log into this facebook.");
    }
  }

  checkLoginState() {
    window.FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }

  handleFBLogin() {
    window.FB.login(this.checkLoginState(), {scope: 'email', return_scopes: true});
  }

  // renderFBButton() {
  //   return (
  //     <div
  //       className="fb-login-button"
  //       data-max-rows="1"
  //       data-size="large"
  //       data-button-type="continue_with"
  //       data-show-faces="true"
  //       data-auto-logout-link="false"
  //       data-use-continue-as="true"
  //       data-onlogin={}
  //       data-scope="email,public_profile"
  //     >
  //     </div>
  //   );
  // }






  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <div
        className="card-box"
        style={{width: '400px', margin: '0 auto', marginTop: '200px'}}
      >
        <h5>
          Login
        </h5>

        <div className="m-t-15">
          <input
            type="email"
            className="form-control"
            placeholder="email"
            value={this.state.email}
            onChange={(e) => this.handleTextChange('email', e.target.value)}
          />
        </div>

        <div className="m-t-15">
          <input
            type="password"
            className="form-control"
            placeholder="password"
            value={this.state.password}
            onChange={(e) => this.handleTextChange('password', e.target.value)}
          />
        </div>

        {this.state.shouldShowErrorMessages && this.renderErrorMessage()}

        <div>
          <button
            onClick={this.handleFBLogin}
            type="button"
            className="btn btn-primary waves-effect w-md waves-light m-b-5 m-t-20"
          >
            Facebook login
          </button>
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

        <div>
          <button
            onClick={this.login}
            type="button"
            className="btn btn-primary waves-effect w-md waves-light m-b-5 m-t-20"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  renderErrorMessage() {
    return (
      <div>
        ERROR
      </div>
    );
  }

  login() {
    API.login(this.constructLoginCredentials())
      .then(({user}) => {
        this.loginSuccessHandler(user);
      })
      .catch((error) => {
        console.log('error', error);

        this.setState({
          shouldShowErrorMessages: true
        });
      });
  }

  loginSuccessHandler(user) {
    let token;

    if (user.fb_account) {
      token = user.fb_auth_token;
    } else {
      token = user.authentication_token;
    }

    Session.create(user, token);
    // TODO: does this have to be facebook auth token?

    this.props.history.push("/");
  }

  handleTextChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  constructLoginCredentials() {
    return {
      email: this.state.email,
      password: this.state.password
    };
  }
}

export default withRouter(Login);

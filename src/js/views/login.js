import React, { Component }     from 'react';
import {
  withRouter,
  Redirect
}                               from 'react-router-dom';
import history                  from '../services/history';
import API                      from '../services/api';
import Session                  from '../services/session';
import FacebookAuth             from '../services/facebookAuth';


class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      redirectToReferrer: false,
      shouldShowErrorMessages: false,
      shouldShowRegistration: false
    };

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.toggleAuthenticationMode = this.toggleAuthenticationMode.bind(this);
  }

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
          {this.state.shouldShowRegistration ? 'Register' : 'Login'}
        </h5>

        {this.state.shouldShowRegistration && (
          <div className="m-t-15">
            <input
              type="string"
              className="form-control"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={(e) => this.handleTextChange('firstName', e.target.value)}
            />
          </div>
        )}

        {this.state.shouldShowRegistration && (
          <div className="m-t-15">
            <input
              type="string"
              className="form-control"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={(e) => this.handleTextChange('lastName', e.target.value)}
            />
          </div>
        )}

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

        {this.renderToggleAuthenticationMode()}

        {this.renderSubmitButton()}

        <FacebookAuth />
      </div>
    );
  }


  //================
  // RENDER METHODS
  //================


  renderToggleAuthenticationMode() {
    let text = this.state.shouldShowRegistration ?
      'Already a member? Sign in here.' :
      'New to Cloud Workout? Join us here!';

    return (
      <p
        className="text-link cursor-pointer"
        onClick={this.toggleAuthenticationMode}
      >
        {text}
      </p>
    );
  }

  renderSubmitButton() {
    // new user registering with email and password
    if (this.state.shouldShowRegistration) {
      return (
        <button
          onClick={this.register}
          type="button"
          className="btn btn-primary waves-effect w-md waves-light m-b-5 m-t-20"
        >
          Register new account
        </button>
      );
    }

    // existing user signing in with email and password
    else {
      return (
        <button
          onClick={this.login}
          type="button"
          className="btn btn-primary waves-effect w-md waves-light m-b-5 m-t-20"
        >
          Log In
        </button>
      );
    }
  }

  renderErrorMessage() {
    return (
      <div>
        ERROR
      </div>
    );
  }


  //================
  // EVENT HANDLERS
  //================


  toggleAuthenticationMode() {
    this.setState({shouldShowRegistration: !this.state.shouldShowRegistration});
  }

  register() {
    API.registerNewUser(this.constructUserRegistrationCredentials())
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

  login() {
    API.login(this.constructLoginCredentials())
      .then(({user}) => {
        Session.create(user, user.authentication_token);

        history.push("/");
      })
      .catch((error) => {
        console.log('error', error);

        this.setState({
          shouldShowErrorMessages: true
        });
      });
  }

  handleTextChange(key, value) {
    this.setState({
      [key]: value
    });
  }


  //=================
  // PRIVATE METHODS
  //=================


  constructLoginCredentials() {
    return {
      email: this.state.email,
      password: this.state.password
    };
  }

  constructUserRegistrationCredentials() {
    return {
      user: {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      }
    }
  }
}

export default withRouter(Login);

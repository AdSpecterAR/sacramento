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
        Session.create(user, user.authentication_token);
        // this.props.history.push(this.props.location.state.from || '/');
        this.props.history.push("/");
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

  constructLoginCredentials() {
    return {
      email: this.state.email,
      password: this.state.password
    };
  }
}

export default withRouter(Login);

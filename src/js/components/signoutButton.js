import React, { Component }     from 'react';
import { withRouter }           from 'react-router-dom';
import Session                  from '../services/session';


class SignoutButton extends Component {

  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
  }

  render() {
    return Session.isLoggedIn() && (
      <button
        onClick={this.logOut}
        type="button"
        className="btn btn-primary waves-effect w-md waves-light m-t-10 m-b-5 m-r-10 pull-right"
      >
        Log out
      </button>
    );
  }

  logOut() {
    // TODO: send API call to back end to log out

    Session.destroy();
    this.props.history.push('/login');
  }
}


export default withRouter(SignoutButton);

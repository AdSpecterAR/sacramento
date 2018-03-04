import React, { Component }     from 'react';
import { withRouter }           from 'react-router-dom';
import Session                  from '../services/session';


class SignoutButton extends Component {

  render() {
    return Session.isLoggedIn() && (
      <button
        onClick={() => {
          Session.destroy();
          this.props.history.push('/login')
        }}
        type="button"
        className="btn btn-primary waves-effect w-md waves-light m-t-10 m-b-5 m-r-10 pull-right"
      >
        Log out
      </button>
    );
  }

}


export default withRouter(SignoutButton);

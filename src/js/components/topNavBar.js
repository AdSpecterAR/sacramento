import React, { Component }     from 'react';
import { Link }                 from 'react-router-dom';


export default class TopBar extends Component {

  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="topbar">
        <div
          className="navbar navbar-default"
          role="navigation"
        >
          <div className="container">
            <div>
              <div className="pull-left">
                <button className="button-menu-mobile open-left waves-effect waves-light">
                  <i className="zmdi zmdi-menu" />
                </button>

                <span className="clearfix" />
              </div>

              <div style={{position: 'absolute', left: '50%', marginLeft: '-100px', width: '200px'}}>
                <Link
                  to="/"
                  className="logo m-l-15"
                >
                  <span>
                    AdSpecter
                  </span>
                </Link>
              </div>

              {
                !isAuthenticated() && (
                  <div>
                    <button
                      onClick={this.login}
                      type="button"
                      className="btn btn-primary waves-effect w-md waves-light m-t-10 m-b-5 m-r-10 pull-right"
                    >
                      Log in
                    </button>
                  </div>
                )
              }

            </div>
          </div>
        </div>
      </div>
    );
  }

}
import React, { Component }     from 'react';
import { Link }                 from 'react-router-dom';


export default class TopBar extends Component {

  render() {
    return (
      <div className="topbar">
        <div
          className="navbar navbar-default"
          role="navigation"
        >
          <div className="container">
            <div className="">
              <div className="pull-left">
                <button className="button-menu-mobile open-left waves-effect waves-light">
                  <i className="zmdi zmdi-menu" />
                </button>

                <span className="clearfix" />
              </div>

              <div>
                <div className="text-center">
                  <Link
                    to="/"
                    className="logo m-l-15"
                  >
                    <span>
                      ADSpecter
                    </span>
                  </Link>

                  <span className="m-l-5">
                    (developer)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
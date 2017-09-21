import React, { Component }     from 'react';


export default class TopBar extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className="topbar">
        <div className="navbar navbar-default" role="navigation">
          <div className="container">
            <div className="">
              <div className="pull-left">
                <button className="button-menu-mobile open-left waves-effect waves-light">
                  <i className="zmdi zmdi-menu"></i>
                </button>

                <span className="clearfix"></span>
              </div>

              <div>
                <div className="text-center">
                  <a href="index.html" className="logo m-l-15">
                    <span><img src="assets/images/logo.png" alt="logo" style={{height: '22px'}} /></span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

}
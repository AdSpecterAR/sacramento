import React, { Component }     from 'react';
import { Link }                 from 'react-router-dom';


export default class SideNavBar extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className="left side-menu">
        <div className="slimScrollDiv" style={{position: 'relative', overflow: 'hidden', width: 'auto', height: '2244px'}}><div className="sidebar-inner slimscrollleft" style={{overflow: 'hidden', width: 'auto', height: '2244px'}}>
          <div id="sidebar-menu">
            <ul>
              <li className="text-muted menu-title">Your Dashboards</li>

              <li className="has_sub">
                <a href="index.html" className="waves-effect"><i className="zmdi zmdi-view-dashboard"></i> <span> Overview </span> </a>
              </li>

              <li className="has_sub">
                <a href="/" className="waves-effect"><i className="zmdi zmdi-invert-colors"></i> <span> Campaigns </span> <span className="menu-arrow"></span> </a>

                <ul className="list-unstyled">
                  <li><a href="ui-buttons.html">Buttons</a></li>
                  <li><a href="ui-cards.html">Cards</a></li>
                  <li><a href="ui-typography.html">Typography </a></li>
                  <li><a href="ui-checkbox-radio.html">Checkboxs-Radios</a></li>
                  <li><a href="ui-materialdesignicons.html">Material Design Icons</a></li>
                  <li><a href="ui-font-awesome-icons.html">Font Awesome Icons</a></li>
                  <li><a href="ui-themify-icons.html">Themify Icons</a></li>
                  <li><a href="ui-modals.html">Modals</a></li>
                  <li><a href="ui-images.html">Images</a></li>
                  <li><a href="ui-components.html">Components</a>
                  </li></ul>
              </li>

              <li className="has_sub active">
                <Link to="/campaign/upload" className="waves-effect active"><i className="zmdi zmdi-case"></i> <span> Upload </span> <span className="menu-arrow"></span> </Link>

                <ul className="list-unstyled">
                  <li><a href="admin-masonry.html">Masonry</a></li>
                  <li><a href="admin-notification.html">Notification</a></li>
                  <li><a href="admin-range-slider.html">Range Slider</a></li>
                  <li><a href="admin-sweetalert.html">Sweet Alert</a>
                  </li></ul>
              </li>

              <li className="text-muted menu-title">More</li>

              <li className="has_sub">
                <a href="/" className="waves-effect"><i className="zmdi zmdi-collection-item"></i><span className="label label-info pull-right">8</span><span> Pages </span></a>

                <ul className="list-unstyled">
                  <li><a href="page-starter.html">Starter Page</a></li>
                  <li><a href="page-login.html">Login</a></li>
                  <li><a href="page-register.html">Register</a></li>
                  <li><a href="page-recoverpw.html">Recover Password</a></li>
                  <li><a href="page-lock-screen.html">Lock Screen</a></li>
                  <li><a href="page-confirm-mail.html">Confirm Mail</a></li>
                  <li><a href="page-404.html">Error 404</a></li>
                </ul>
              </li>

              <li className="has_sub">
                <a href="/" className="waves-effect"><i className="ti-share"></i><span> Multi Level </span> <span className="menu-arrow"></span></a>

                <ul>
                  <li className="has_sub">
                    <a href="/" className="waves-effect"><span>Menu Level 1.1</span> <span className="menu-arrow"></span></a>
                    <ul>
                      <li><a href="/"><span>Menu Level 2.1</span></a></li>
                      <li><a href="/"><span>Menu Level 2.2</span></a></li>
                      <li><a href="/"><span>Menu Level 2.3</span></a></li>
                    </ul>
                  </li>

                  <li>
                    <a href="/"><span>Menu Level 1.2</span></a>
                  </li>
                </ul>
              </li>
            </ul>

            <div className="clearfix"></div>
          </div>

          <div className="clearfix"></div>

        </div>
          <div className="slimScrollBar" style={{background: 'rgb(77, 89, 106)', width: '7px', position: 'absolute', top: '0px', opacity: '0.4', display: 'none', borderRadius: '7px', zIndex: '99', right: '1px', height: '706px', visibility: 'visible'}}></div><div className="slimScrollRail" style={{width: '7px', height: '100%', position: 'absolute', top: '0px', display: 'none', borderRadius: '7px', background: 'rgb(51, 51, 51)', opacity: '0.2', zIndex: '90', right: '1px'}}></div>
        </div>
      </div>
    );
  }

}
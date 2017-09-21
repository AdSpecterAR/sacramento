import React, { Component }     from 'react';
import { NavLink, Link }        from 'react-router-dom';
import Classnames               from 'classnames';


export default class SideNavBar extends Component {

  constructor(props) {
    super(props);

    let navItemsData = [
      {
        name: 'Overview',
        href: '/',
        iconClassName: 'zmdi zmdi-view-dashboard'
      },
      {
        name: 'Campaigns',
        href: '/campaigns',
        iconClassName: 'fa fa-dollar'
      },
      {
        name: 'Upload',
        href: '/campaign/upload',
        iconClassName: 'fa fa-plus'
      }
    ];

    this.state = {
      navItemsData
    };
  }

  render() {
    return (
      <div className="left side-menu">
        <div
          className="slimScrollDiv"
          style={{
            position: 'relative',
            overflow: 'hidden',
            width: 'auto',
            height: '2244px'
          }}
        >
          <div
            className="sidebar-inner slimscrollleft"
            style={{
              overflow: 'hidden',
              width: 'auto',
              height: '2244px'
            }}
          >
            <div id="sidebar-menu">
              <ul>
                <li className="text-muted menu-title">
                  Your Dashboards
                </li>

                {this.renderNavItems()}

                <li className="text-muted menu-title">
                  More
                </li>

                <li className="has_sub">
                  <Link
                    to="/"
                    className="waves-effect"
                  >
                    <i className="zmdi zmdi-collection-item" />

                    <span className="label label-info pull-right">
                      8
                    </span>

                    <span> Pages </span>
                  </Link>
                </li>

                <li className="has_sub">
                  <Link
                    to="/"
                    className="waves-effect"
                  >
                    <i className="ti-share" />

                    <span> Multi Level </span>

                    <span className="menu-arrow" />
                  </Link>
                </li>
              </ul>

              <div className="clearfix"></div>
            </div>

            <div className="clearfix"></div>
          </div>

          <div
            className="slimScrollBar"
            style={{
              background: 'rgb(77, 89, 106)',
              width: '7px',
              position: 'absolute',
              top: '0px',
              opacity: '0.4',
              display: 'none',
              borderRadius: '7px',
              zIndex: '99',
              right: '1px',
              height: '706px',
              visibility: 'visible'
            }}
          >
          </div>

          <div
            className="slimScrollRail"
            style={{
              width: '7px',
              height: '100%',
              position: 'absolute',
              top: '0px',
              display: 'none',
              borderRadius: '7px',
              background: 'rgb(51, 51, 51)',
              opacity: '0.2',
              zIndex: '90',
              right: '1px'
            }}
          >
          </div>
        </div>
      </div>
    );
  }


  renderNavItems() {
    return this.state.navItemsData.map((navItem, index) => {
      return (
        <li
          key={`navItem${index}`}
          className={Classnames({'has_sub': true})}
          activeClassName="active"
        >
          <NavLink
            exact={navItem.href === '/'}
            to={navItem.href}
            className={Classnames({'waves-effect': true})}
            activeClassName="active"
          >
            <i className={navItem.iconClassName} />

            <span> {navItem.name} </span>
          </NavLink>
        </li>
      );
    });
  }
}

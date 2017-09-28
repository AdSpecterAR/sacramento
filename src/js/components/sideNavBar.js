import React, { Component }     from 'react';
import { NavLink, Link }        from 'react-router-dom';
import Classnames               from 'classnames';


export default class SideNavBar extends Component {

  render() {
    return (
      <div
        className="left side-menu"
        style={{position: 'fixed'}}
      >
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
                  Your dashboards
                </li>

                {this.renderNavItems()}
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
    return this.props.navItems.map((navItem, index) => {
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

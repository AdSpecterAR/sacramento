import React, { Component }     from 'react';
import SideNavBar               from '../sideNavBar';


export default class AdvertiserSideNavBar extends Component {

  constructor(props) {
    super(props);

    let navItems = [
      {
        name: 'Home',
        href: '/',
        iconClassName: 'zmdi zmdi-view-dashboard'
      },
      {
        name: 'Monetize',
        href: '/monetize',
        iconClassName: 'fa fa-dollar'
      },
      {
        name: 'Campaigns',
        href: '/campaign/upload',
        iconClassName: 'fa fa-plus'
      },
      {
        name: 'Campaigns',
        href: '/campaign/upload',
        iconClassName: 'fa fa-plus'
      },
      {
        name: 'Campaigns',
        href: '/campaign/upload',
        iconClassName: 'fa fa-plus'
      }
    ];

    this.state = {
      navItems
    };
  }

  render() {
    return (
      <SideNavBar navItems={this.state.navItems} />
    );
  }

}

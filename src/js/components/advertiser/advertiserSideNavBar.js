import React, { Component }     from 'react';
import SideNavBar               from '../sideNavBar';


export default class AdvertiserSideNavBar extends Component {

  constructor(props) {
    super(props);

    let navItems = [
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
      navItems
    };
  }

  render() {
    return (
      <SideNavBar navItems={this.state.navItems} />
    );
  }

}

import React, { Component }     from 'react';
import SideNavBar               from '../sideNavBar';


export default class DeveloperSideNavBar extends Component {

  constructor(props) {
    super(props);

    let navItems = [
      {
        name: 'Monetize',
        href: '/monetize',
        iconClassName: 'fa fa-dollar'
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

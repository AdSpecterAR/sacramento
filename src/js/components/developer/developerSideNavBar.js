import React, { Component }     from 'react';
import SideNavBar               from '../sideNavBar';


export default class DeveloperSideNavBar extends Component {

  constructor(props) {
    super(props);

    let navItems = [
      {
        name: 'Home',
        href: '/',
        iconClassName: 'fa fa-home'
      },
      {
        name: 'Monetize',
        href: '/monetize',
        iconClassName: 'fa fa-dollar'
      },
      {
        name: 'Campaigns',
        href: '/campaigns',
        iconClassName: 'fa fa-globe'
      },
      {
        name: 'Analyze',
        href: '/analyze',
        iconClassName: 'fa fa-line-chart'
      },
      {
        name: 'Courses List',
        href: '/courses',
        iconClassName: 'fa fa-cog'
      },
      {
        name: 'Stream',
        href: '/stream',
        iconClassName: 'fa fa-cog'
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

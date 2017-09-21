import React, { Component }     from 'react';
import TopNavBar                   from '../components/topNavBar';
import SideNavBar               from '../components/sideNavBar';


export default class Layout extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        <TopNavBar />

        <SideNavBar />

        <div className="content-page">
          <div className="content">
            <div className="container">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

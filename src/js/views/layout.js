import React, { Component }     from 'react';
import TopNavBar                from '../components/topNavBar';


export default class Layout extends Component {

  render() {
    return (
      <div>
        {/*{this.renderFacebookSDK()}*/}

        <TopNavBar auth={this.props.auth} />

        {/*<DeveloperSideNavBar />*/}

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

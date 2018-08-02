import React, { Component }     from 'react';
import TopNavBar                from '../components/topNavBar';


export default class Layout extends Component {

  render() {
    return (
      <div>
        <TopNavBar auth={this.props.auth} />

        <div className="content-container" style={{marginTop: '50px'}}>
          <div className="container">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

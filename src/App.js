import React, { Component }       from 'react';
import {
  BrowserRouter as Router,
  Route
}                                 from 'react-router-dom';
import Layout                     from './js/views/layout';
import MetricsDashboard           from './js/views/metricsDashboard';
import DeveloperAppRegistration   from './js/components/developer/developerAppRegistration';
import AdvertiserUploadForm       from './js/components/advertiser/advertiserUploadForm';
import Auth                       from './js/services/auth';
import AuthCallback               from './js/services/authCallback';
import './App.css';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

class App extends Component {

  constructor(props) {
    super(props);

    // auth.login();
  }

  render() {
    return (
      <Router>
        <Layout auth={auth}>
          <Route exact path="/" />
          <Route path="/auth_callback" render={(props) => {
            handleAuthentication(props);
            return <AuthCallback {...props} />
          }}/>

          <Route path="/campaigns" component={AdvertiserUploadForm} />
          <Route path="/monetize" component={DeveloperAppRegistration} />
          <Route path="/analyze" component={MetricsDashboard} />
        </Layout>
      </Router>
    );
  }
}

export default App;

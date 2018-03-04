import React, { Component }       from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
}                                 from 'react-router-dom';
import AuthorizedRoute            from './js/services/authorizedRoute';
import Layout                     from './js/views/layout';
import MetricsDashboard           from './js/views/metricsDashboard';
import Login                      from './js/views/login';
import Logout                     from './js/views/logout';
import DeveloperAppRegistration   from './js/components/developer/developerAppRegistration';
import AdvertiserUploadForm       from './js/components/advertiser/advertiserUploadForm';
import './App.css';


class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />

          {/* Protected Routes */}
          <Layout>
            <AuthorizedRoute exact path="/" component={MetricsDashboard} />
            <AuthorizedRoute path="/campaigns" component={AdvertiserUploadForm} />
            <AuthorizedRoute path="/monetize" component={DeveloperAppRegistration} />
            <AuthorizedRoute path="/analyze" component={MetricsDashboard} />
          </Layout>
        </Switch>
      </Router>
    );
  }
}

export default App;

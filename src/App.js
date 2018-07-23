import React, { Component }       from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
}                                 from 'react-router-dom';
import { StripeProvider }         from 'react-stripe-elements';
import AuthorizedRoute            from './js/services/authorizedRoute';
import Layout                     from './js/views/layout';
import MetricsDashboard           from './js/views/metricsDashboard';
import Login                      from './js/views/login';
import Logout                     from './js/views/logout';
import ClassSessionContainer      from './js/views/classSessionContainer';
import DeveloperAppRegistration   from './js/components/developer/developerAppRegistration';
import AdvertiserUploadForm       from './js/components/advertiser/advertiserUploadForm';
import CoursesListContainer       from './js/components/coursesListContainer';
import CheckoutFormContainer      from './js/components/checkoutFormContainer';
import './App.css';


class App extends Component {

  render() {
    return (
      <Router>
        <StripeProvider apiKey="pk_test_JfkJNk8SSeqeBrfmHhKBh4K6">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />

            {/* Protected Routes */}
            <Layout>
              <AuthorizedRoute exact path="/" component={CoursesListContainer} />
              <AuthorizedRoute path="/campaigns" component={AdvertiserUploadForm} />
              <AuthorizedRoute path="/monetize" component={DeveloperAppRegistration} />
              <AuthorizedRoute path="/analyze" component={MetricsDashboard} />
              <AuthorizedRoute path="/class/:classId" component={ClassSessionContainer} />
              <AuthorizedRoute path="/charge" component={CheckoutFormContainer} />
            </Layout>
          </Switch>
        </StripeProvider>
      </Router>
    );
  }
}

export default App;

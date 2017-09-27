import React, { Component }       from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
}                                 from 'react-router-dom';
import Layout                     from './js/views/layout';
import MetricsDashboard           from './js/views/metricsDashboard';
import AppOnboarding              from './js/components/developer/appOnboarding';
import AdvertiserUploadForm       from './js/components/advertiser/advertiserUploadForm';
import CampaignsList              from './js/components/advertiser/campaignsList';
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Route exact path="/" component={MetricsDashboard} />
          <Route path="/campaigns" component={CampaignsList} />
          <Route path="/campaign/upload" component={AdvertiserUploadForm} />

          <Route path="/monetize" component={AppOnboarding} />
        </Layout>
      </Router>
    );
  }
}

export default App;

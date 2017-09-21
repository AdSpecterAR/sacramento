import React, { Component }       from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
}                                 from 'react-router-dom';
import Layout                     from './js/views/layout';
import AdvertiserUploadForm       from './js/components/advertiserUploadForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Route exact path="/campaign/upload" component={AdvertiserUploadForm} />
        </Layout>
      </Router>
  );
  }
}

export default App;

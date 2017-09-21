import React, { Component }       from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
}                                 from 'react-router-dom';
import AdvertiserUploadForm       from './js/components/advertiserUploadForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={AdvertiserUploadForm} />
      </Router>
  );
  }
}

export default App;

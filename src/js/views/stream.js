import React, { Component }     from 'react';


export default class Stream extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        <iframe
          width="560"
          height="315"
          src={'https://www.youtube.com/embed/es2Ha1oKkgY' + '?autoplay=1&controls=0&mode=opaque&rel=0&autohide=1&showinfo=0&wmode=transparent'}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation"
          allowFullScreen
        />
      </div>
    );
  }

}
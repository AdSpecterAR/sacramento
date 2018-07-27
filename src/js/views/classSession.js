import React, { Component }     from 'react';
import FeedbackModule           from '../components/feedbackModule';

const url = 'https://www.youtube.com/embed/es2Ha1oKkgY';


export default class ClassSession extends Component {

  constructor(props) {
    super(props);

    this.state = {
      width: '560px',
      height: '315px',
      isFullScreen: false
    };

    this.toggleVideoSize = this.toggleVideoSize.bind(this);
  }

  render() {
    let courseSession = this.props.class_session.course_session;
    let videoUrl = courseSession.video_url;

    console.log('state', this.state);
    return (
      <div>
        {videoUrl ? (
          <div style={{width: this.state.width, height: this.state.height}}>
            <iframe
              width={'100%'}
              height={'100%'}
              style={{pointerEvents: 'none'}}
              src={videoUrl + '?autoplay=1&controls=0&mode=opaque&rel=0&autohide=1&showinfo=0&wmode=transparent'}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation"
              allowFullScreen
            />
          </div>
        ) : (
          <div>
            Oh no!! Looks like there was a problem displaying the video.
            Don't worry though, we're on it! If you have any further questions,
            please send an email to john@cloudworkout.com.
          </div>
        )}

        <div onClick={this.toggleVideoSize}>
          Change size
        </div>

        <FeedbackModule
          classSession={this.props.class_session}
          setUserCourseSession={this.props.setUserCourseSession}
        />
      </div>
    );
  }

  toggleVideoSize() {
    if (this.state.isFullScreen) {
      this.setState({
        width: '560px',
        height: '315px',
        isFullScreen: false
      });
    } else {
      this.setState({
        width: '1120px',
        height: '630px',
        isFullScreen: true
      });
    }
  }

}

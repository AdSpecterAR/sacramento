import React, { Component }     from 'react';
import FeedbackModule           from '../components/feedbackModule';

const url = 'https://www.youtube.com/embed/es2Ha1oKkgY';


export default class ClassSession extends Component {

  render() {
    console.log(this.props.class_session);
    let courseSession = this.props.class_session.course_session;
    let videoUrl = courseSession.video_url;

    return (
      <div>
        {videoUrl ? (
          <iframe
            width="560"
            height="315"
            src={videoUrl + '?autoplay=1&controls=0&mode=opaque&rel=0&autohide=1&showinfo=0&wmode=transparent'}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation"
            allowFullScreen
          />
        ) : (
          <div>
            Oh no!! Looks like there was a problem displaying the video.
            Don't worry though, we're on it! If you have any further questions,
            please send an email to john@cloudworkout.com.
          </div>
        )}

        <h2>
          {this.props.class_session.name}
        </h2>

        <FeedbackModule
          classSession={this.props.class_session}
          setUserCourseSession={this.props.setUserCourseSession}
        />
      </div>
    );
  }

}

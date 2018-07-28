import React, { Component }     from 'react';
import FeedbackModule           from '../components/feedbackModule';

const url = 'https://www.youtube.com/embed/es2Ha1oKkgY';

//
// TODO: Move this
// YouTube User ID: 3-eGPuInuVmMTbyyFVUDlg
//
// YouTube Channel ID: UC3-eGPuInuVmMTbyyFVUDlg
//


export default class ClassSession extends Component {

  constructor(props) {
    super(props);

    this.state = {
      width: 840,
      // height: '315px',
      isFullScreen: false
    };

    this.toggleVideoSize = this.toggleVideoSize.bind(this);
  }

  render() {
    let courseSession = this.props.class_session.course_session;
    let videoUrl = courseSession.video_url;

    return (
      <div>
        {videoUrl ? (
          <div style={{width: `${this.state.width}px`, height: `${this.calculateVideoHeight(this.state.width)}px`}}>
            {/*<iframe*/}
              {/*width={'100%'}*/}
              {/*height={'100%'}*/}
              {/*style={{pointerEvents: 'none'}}*/}
              {/*src={videoUrl + '?autoplay=1&controls=0&mode=opaque&rel=0&autohide=1&showinfo=0&wmode=transparent'}*/}
              {/*frameBorder="0"*/}
              {/*allow="autoplay; encrypted-media"*/}
              {/*sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation"*/}
              {/*allowFullScreen*/}
            {/*/>*/}

            <span>
              <iframe
                width={'100%'}
                height={'100%'}
                className="adjacent"
                // style={{pointerEvents: 'none'}}
                src={'https://www.youtube.com/embed/qZpeO6Zj8as?autoplay=1'}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation"
                allowFullScreen
              />
            </span>

            <span style={{width: '240px'}}>
              names
            </span>
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

        <div>
          <h4>PARTICIPANTS</h4>

          {this.renderParticipants()}
        </div>

        <FeedbackModule
          classSession={this.props.class_session}
          setUserCourseSession={this.props.setUserCourseSession}
        />
      </div>
    );
  }

  renderParticipants() {
    return this.props.participants.map((participant, index) => {
      return (
        <div key={`participant${index}`}>
          {participant}
        </div>
      );
    });
  }

  calculateVideoHeight(width) {
    return width * 315 / 560;
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

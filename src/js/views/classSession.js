import React, { Component }     from 'react';
import Moment                   from 'moment';
import FeedbackModule           from '../components/feedbackModule';
import FixedAspectRatio         from '../services/fixedAspectRatio';

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
      width: 1080,
      // height: '315px',
      isFullScreen: false
    };

    this.toggleVideoSize = this.toggleVideoSize.bind(this);
  }

  render() {
    let courseSession = this.props.class_session.course_session;
    let videoUrl = courseSession.video_url;
    let peerPurple = '#4E516A';

    return (
      <div>
        {videoUrl ? (
          <div
            style={{maxWidth: `${this.state.width}px`}}
            className="video-player-small"
          >
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

            <FixedAspectRatio ratio={'560:315'}>
              <iframe
                width={'100%'}
                height={'100%'}
                // style={{pointerEvents: 'none'}}
                src={'https://www.youtube.com/embed/so8U-eq9yYk'}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation"
                allowFullScreen
              />
            </FixedAspectRatio>

            {/*<iframe*/}
              {/*width={'100%'}*/}
              {/*height={'100%'}*/}
              {/*// className="adjacent"*/}
              {/*// style={{pointerEvents: 'none'}}*/}
              {/*src={'https://www.youtube.com/live_chat?v=qZpeO6Zj8as&amp;embed_domain=localhost'}*/}
              {/*// frameBorder="0"*/}
              {/*// allow="autoplay; encrypted-media"*/}
              {/*// sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation"*/}
              {/*// allowFullScreen*/}
            {/*/>*/}
          </div>
        ) : (
          <div>
            Oh no!! Looks like there was a problem displaying the video.
            Don't worry though, we're on it! If you have any further questions,
            please send an email to john@cloudworkout.com.
          </div>
        )}

        <div>
          <div
            className="col-sm-7"
            style={{paddingBottom: '80px'}}
          >
            {/*<div onClick={this.toggleVideoSize}>*/}
            {/*Change size*/}
            {/*</div>*/}

            <div style={{marginTop: '40px', paddingBottom: '20px', borderBottom: '2px solid #E8E8E8'}}>
              <h2>
                {this.props.class_session.course_name}
              </h2>

              <p className="m-b-0">
                <b>{Moment(courseSession.start_time).format('dddd, MMMM Do, h:mm a')}</b>
              </p>

              <p className="m-b-0">
                <b>Activity: </b> High Intensity Interval Training {/*this.props.class_session.course_category*/}
              </p>

              <p>
                <b>Level: </b> {this.capitalizeFirstLetter(this.props.class_session.course_difficulty)}
              </p>
            </div>

            <div style={{marginTop: '40px', paddingBottom: '20px', borderBottom: '2px solid #E8E8E8'}}>
              <h4>Description</h4>

              <p>
                {this.props.class_session.course_description}
              </p>
            </div>

            <div style={{marginTop: '40px', paddingBottom: '20px'}}>
              <h4>Equipment</h4>

              <p>
                {this.props.class_session.course_equipment}
              </p>
            </div>


            {/*<FeedbackModule*/}
            {/*classSession={this.props.class_session}*/}
            {/*setUserCourseSession={this.props.setUserCourseSession}*/}
            {/*/>*/}
          </div>

          <div className="col-sm-4 col-sm-offset-1">
            <div style={{marginTop: '40px'}}>
              <h4>PARTICIPANTS</h4>

              <p>
                <b>{this.props.participants.length} watching</b>
              </p>

              <div style={{
                border: `1px solid #E8E8E8`,
                backgroundColor: 'white',
                height: '250px',
                overflowY: 'auto'
              }}>
                {this.renderParticipants()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderParticipants() {
    return this.props.participants.map((participant, index) => {
      return (
        <div style={{padding: '15px', paddingTop: index === 0 ? '20px' : '15px'}}>
          <div
            className="pull-right"
            style={{marginTop: '4px', marginRight: '10px', width: '8px', height: '8px', borderRadius: '4px', backgroundColor: '#68E090'}}
          >
          </div>

          <span
            key={`participant${index}`}
            style={{
              marginLeft: '10px',
            }}
          >
            {participant}
          </span>
        </div>
      );
    });
  }

  // TODO: MOVE TO UTILITY OR SERVICE FILE
  capitalizeAllLetters(string) {
    return string.toUpperCase();
  }

  // TODO: MOVE TO UTILITY OR SERVICE FILE
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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

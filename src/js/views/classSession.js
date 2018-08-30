import React, { Component }     from 'react';
import Moment                   from 'moment';
import {
  Player,
  ControlBar,
  FullscreenToggle,
  PlayToggle,
  VolumeMenuButton,
  BigPlayButton
}                               from 'video-react';
import _                        from 'underscore';
import FixedAspectRatio         from '../services/fixedAspectRatio';
import Session                  from '../services/session';
import "../../../node_modules/video-react/dist/video-react.css";

import Metrics, {
  HeartRate,
  Calories
}                                from './workoutMetrics'
import LineGraph                 from './lineGraph'

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

    //default data
    let data1 = [0, 10, 5, 7, 8, 6, 4, 3, 5, 7, 10, 10, 8, 7, 6, 6, 5, 7, 8, 6];
    let data2 = [3, 4, 6, 6, 5, 4, 3, 5, 6, 8, 9, 8, 7, 8, 5, 6, 8, 9, 8, 7, 6];

    let premiumParticipants = [
      {
        full_name: 'Jake Roust',
        profile_picture_url: 'https://s3-us-west-1.amazonaws.com/avatars-cloudworkout/mayo.jpg',
        coefficient: 1,
        initial_points: 101,
        points: 0, // TODO: add
        colour: 'rgba(82, 192, 83, 0.8)'
      },
      {
        full_name: 'Casey Lim',
        profile_picture_url: 'https://s3-us-west-1.amazonaws.com/avatars-cloudworkout/haoda.png',
        coefficient: 0.8,
        initial_points: 110,
        points: 0
      },
      // {
      //   full_name: 'John Li',
      //   profile_picture_url: 'https://s3-us-west-1.amazonaws.com/avatars-cloudworkout/john.PNG',
      //   coefficient: 0.9,
      //   initial_points: 106,
      //   points: 0
      // },
      {
        full_name: 'Rachel Mazuki',
        profile_picture_url: 'https://s3-us-west-1.amazonaws.com/avatars-cloudworkout/chedy.jpg',
        coefficient: 0.7,
        initial_points: 100,
        points: 0
      },
      // {
      //   full_name: 'Miki Wan',
      //   profile_picture_url: 'https://s3-us-west-1.amazonaws.com/avatars-cloudworkout/rabs.JPG',
      //   coefficient: 0.9,
      //   points: 0
      // },
      {
        full_name: 'Mel Fontenot',
        profile_picture_url: 'https://s3-us-west-1.amazonaws.com/avatars-cloudworkout/berges.jpg',
        coefficient: 0.6,
        initial_points: 103,
        points: 0
      },
      {
        full_name: 'Travis Williams',
        profile_picture_url: 'https://s3-us-west-1.amazonaws.com/avatars-cloudworkout/connor.jpg',
        coefficient: 0.7,
        initial_points: 87,
        points: 0
      },
      {
        full_name: 'Scott Davidson',
        profile_picture_url: 'https://s3-us-west-1.amazonaws.com/avatars-cloudworkout/corey.jpg',
        coefficient: 0.8,
        initial_points: 65,
        points: 0
      },
      {
        full_name: 'Ashley Tang',
        profile_picture_url: 'https://s3-us-west-1.amazonaws.com/avatars-cloudworkout/karen.jpg',
        coefficient: 0.95,
        initial_points: 86,
        points: 0
      },
      {
        full_name: 'Valerie Yung',
        profile_picture_url: 'https://s3-us-west-1.amazonaws.com/avatars-cloudworkout/rabs.JPG',
        coefficient: 0.8,
        initial_points: 96,
        points: 0,
        colour: 'orange'
      }
    ];

    let competingParticipants = [
      {
        full_name: 'Jake Roust',
        profile_picture_url: 'https://s3-us-west-1.amazonaws.com/avatars-cloudworkout/mayo.jpg',
        coefficient: 0.8,
        points: data1[data1.length - 1],
        colour: 'rgba(82, 192, 83, 0.8)'
      },
      {
        full_name: 'Valerie Yung',
        profile_picture_url: 'https://s3-us-west-1.amazonaws.com/avatars-cloudworkout/rabs.JPG',
        coefficient: 0.8,
        points: 0,
        colour: 'orange'
      },
    ];

    this.state = {
      width: 1080,
      premiumParticipants,
      isFullScreen: false,
      competingParticipants,
      data1,
      data2
    };

    this.toggleVideoSize = this.toggleVideoSize.bind(this);
    this.handleFullScreen = this.handleFullScreen.bind(this);
    this.addPoints = this.addPoints.bind(this);
  }

  addPoints() {
    // if (!this.isCurrentlyStreaming()) {
    //   return;
    // }
    try{
      const { player } = this.refs.player.getState();

      if(player.currentTime < 5) {
        this.refs.calories.resetCalories();
        this.refs.heartRate.resetHeartRate();
        this.setInitialPoints();
        return;
      }
    } catch(err) {}


    let premiumParticipants = _.clone(this.state.premiumParticipants);

    let newParticipants = premiumParticipants.map((participant) => {
      
      let { full_name, profile_picture_url, coefficient, initial_points, points , colour} = participant;
      let addedPoints = (coefficient * Math.random() * 3);
      let newPoints = Math.round(points + addedPoints);


      return {
        full_name,
        profile_picture_url,
        coefficient,
        initial_points,
        points: newPoints,
        colour
      };
    });

    let sortedNewParticipants = _.sortBy(newParticipants, 'points').reverse();

    this.setState({
      premiumParticipants: sortedNewParticipants
    });
  }

  setInitialPoints() {
    let premiumParticipants = _.clone(this.state.premiumParticipants);

    let newParticipants = premiumParticipants.map((participant) => {
      let { full_name, profile_picture_url, coefficient, initial_points , colour} = participant;
      let seconds = this.getSecondsAfterStartTime();
      // let newPoints = Math.round((seconds * 0.5) - (0.3 * seconds) + (0.3 * coefficient * Math.random(seconds)));
      let newPoints = participant.initial_points;

      return {
        full_name,
        profile_picture_url,
        coefficient,
        initial_points,
        points: newPoints,
        colour
      };
    });

    let sortedNewParticipants = _.sortBy(newParticipants, 'points').reverse();

    this.setState({
      premiumParticipants: sortedNewParticipants
    });
  }

  componentDidMount() {
    this.setInitialPoints();
    this.interval = setInterval(this.addPoints, 2500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  render() {
    let courseSession = this.props.class_session.course_session;
    let videoUrl = courseSession.video_url;

    let isLive = courseSession.live;

    let startTime = this.getCourseStartTime();
    let liveStreamTime = this.getLiveStreamTime();
    let thumbnailUrl = courseSession.thumbnail_image_url;
    let secondsAfterStartTime = this.getSecondsAfterStartTime(liveStreamTime);

    return (
      <div>
        {this.hasLiveStreamStarted(liveStreamTime) ? (
          <div>
            {this.renderVideo(videoUrl, secondsAfterStartTime, isLive)}
          </div>
        ) : (
          <div>
            <div
              style={{maxWidth: `${this.state.width}px`}}
              className="video-player-small"
            >
              <FixedAspectRatio ratio={'560:315'}>
                <div style={{width: '100%', height: '100%'}}>
                  <img src="https://i.imgur.com/7pwEANH.png" width="100%" height="100%" />
                </div>
              </FixedAspectRatio>
            </div>
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

          <div className="col-sm-4 col-sm-offset-1" style={{marginTop: '40px'}}>
            <div className="card-box text-align-center">
              <h4>
                Want to get on the leaderboard?
              </h4>

              <div className="m-t-25">
                Premium members can sync up our heart rate monitors
                to our workouts to compete live. We'll send out
                more information after your workout!
              </div>
            </div>

            <div className="card-box text-align-center">
              <h3>
                Instructor Spotlight
              </h3>

              <div style={{width: '130px', height: '130px', margin: 'auto'}} className="m-t-20">
                <img style={{borderRadius: '50%'}} width="100%" height="100%" src="https://s3-us-west-1.amazonaws.com/cloudworkout/Leticia_Taylor.png" alt=""/>
              </div>

              <h4 className="m-t-20">
                {}
              </h4>

              <div clasName="m-t-25">
                Leticia has over 4 years of experience teaching hot yoga,
                pilates, and HIIT classes. She's currently an instructor
                at Core 40 in San Francisco.
              </div>
            </div>

            {/*{this.renderLeaderboard()}*/}

          </div>

          {/*<div>*/}
            {/*<button onClick={this.handleFullScreen}>*/}
              {/*Full screen*/}
            {/*</button>*/}
          {/*</div>*/}
        </div>
      </div>
    );
  }

  //this is the 2 person leaderboard that goes with the trend line for 1 v 1 competition
  renderOneVsOneBoard() {
    return (
      <div style={{fontFamily: 'Arimo'}} className="leaderboard">

        {/*<div*/}
          {/*style={{*/}
            {/*position: 'absolute',*/}
            {/*bottom: '80px',*/}
            {/*padding: '15px',*/}
            {/*width: '55%',*/}
            {/*color: 'white',*/}
            {/*// backgroundColor: 'rgb(19, 30, 61)',*/}
            {/*height: '40px',*/}
            {/*fontSize: '22px'*/}
          {/*}}*/}
        {/*>*/}
          {/*<h5*/}
            {/*// className="pull-right"*/}
            {/*style={{*/}

              {/*color: 'white',*/}
              {/*margin: '0',*/}
              {/*marginLeft: '57px'*/}
            {/*}}*/}
          {/*>*/}
            {/*vs.*/}
          {/*</h5>*/}

        {/*</div>*/}

        <div style={{
          // backgroundColor: 'rgba(46,44,46, 0.8)',
          backgroundColor: 'none',
          height: '100%',
          overflowY: 'auto',
          width: '55%',
          color: 'white',
          zIndex: 1
        }}>
          {this.renderCompetingParticipants()}
        </div>
      </div>
    )
  }

  YouOrName(you, name) {
    if (name == you) {
      return "You"
    } else {
      return name;
    }
  }
  //this is just like renderPremiumParticipants except the participants get coloured
  //circles and don't display points
  renderCompetingParticipants(){
    // console.log(competingParticipants);
    return this.state.competingParticipants.map((participant, index) => {
      return (
        <div
          style={{
            padding: '25px',
            fontSize: '16px',
            paddingTop: index === 0 ? '20px' : '15px',
            paddingBottom: '6px',
            backgroundColor: participant === Session.getCurrentUser().full_name ? 'rgba(19,30,61, 0.8)' : 'none'
          }}
        >

          {/*<div*/}
            {/*className="pull-right m-r-10"*/}
          {/*>*/}
            {/*{participant.points}*/}
          {/*</div>*/}

          <span
            key={`participant${index}`}
            style={{
              marginLeft: '0px',
            }}
          >

            {index === 0 ? (<div></div>) : (
              <div style={{
                marginLeft: '52px',
                marginBottom: '20px'
              }}>
                vs.
              </div>
            )}

            <div
              className="pull-left"
              style={{
                marginTop: '-10px',
                marginRight: '10px',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: participant.colour,
                verticalAlign: 'middle'
              }}
            >
              <img
                src={participant.profile_picture_url}
                height={30}
                width={30}
                style={{
                  borderRadius: '50%',
                  // marginRight: '10px',
                  marginLeft: '4px',
                  marginTop: '4px',
                  verticalAlign: 'middle'
                }}
              />
            </div>
            {this.YouOrName('Jake Roust', participant.full_name)}
            {/*{participant.full_name}*/}
          </span>
        </div>
      );
    });
  }

  //this get the most recent points from the LineGraph component(these are just random numbers for demo day
  updateCompetingPoints(){
    // console.log("updating");
    let competingParticipants = _.clone(this.state.competingParticipants);

    let newParticipants = competingParticipants.map((participant) => {
      let { full_name, profile_picture_url, coefficient, initial_points, colour } = participant;

      let data = data = this.refs.line1.data;;
      if (participant.colour === 'orange') {
        data = this.refs.line1.state.data;
      } else if (participant.colour === 'rgba(82, 192, 83, 0.8)') {
        data = this.refs.line2.state.data;
      }
      // console.log(data);
      let newPoints = data[data.length - 1];

      return {
        full_name,
        profile_picture_url,
        coefficient,
        initial_points,
        points: newPoints,
        colour
      };
    });

    let sortedNewParticipants = _.sortBy(newParticipants, 'points').reverse();

    this.setState({
      competingParticipants: sortedNewParticipants
    });
  }

  renderLeaderboard() {
    return (
      <div style={{marginTop: '40px', fontFamily: 'Arimo'}} className="leaderboard">
        {/*<h4>PARTICIPANTS</h4>*/}

        {/*<p>*/}
          {/*<b>{this.props.participants.length} watching</b>*/}
        {/*</p>*/}

        <div
          style={{
            padding: '15px',
            width: '100%',
            color: 'white',
            backgroundColor: 'rgb(19, 30, 61)',
            height: '40px',
            fontSize: '12px'
          }}
        >
          <h5
            className="pull-left"
            style={{color: 'white', margin: '0'}}
          >
            Leaderboard
          </h5>

          <div className="pull-right">
            Score
          </div>
        </div>

        <div style={{
          backgroundColor: 'rgba(46,44,46, 0.8)',
          height: '480px',
          overflowY: 'auto',
          width: '100%',
          color: 'white',
          overflow: 'hidden'
        }}>
          {this.renderPremiumParticipants()}
          {this.renderParticipants()}
        </div>
      </div>
    );
  }

  renderPremiumParticipants() {
    return this.state.premiumParticipants.map((participant, index) => {
      return (
        <div
          style={{
            padding: '15px',
            fontSize: '12px',
            paddingTop: index === 0 ? '20px' : '15px',
            backgroundColor: participant.colour || 'rgba(46,44,46, 0.8)'
            // backgroundColor: participant.full_name === "Jake Roust" ? 'rgba(19,30,61, 0.8)' : 'rgba(46,44,46, 0.8)'
          }}
        >

          <div
            className="pull-right m-r-10" style={{
              height: '25px',
              width: '45px',
              marginTop: '3px',
              borderRadius: '45%',
              // backgroundColor: participant.colour,
              verticalAlign: 'text-middle'
            }}
          >
            <div style={{
              margin: '6px',
              textAlign: 'center'
            }}>
              {participant.points}
            </div>
          </div>

          <span
            key={`participant${index}`}
            style={{
              marginLeft: '0px',
            }}
          >
            {index + 1}

            <img
              src={participant.profile_picture_url}
              height={30}
              width={30}
              style={{
                borderRadius: '50%',
                marginRight: '10px',
                marginLeft: '20px',
                verticalAlign: 'middle'
              }}
            />

            {participant.full_name}
          </span>
        </div>
      );
    });
  }

  renderParticipants() {
    return this.props.participants.map((participant, index) => {
      return (
        <div
          style={{
            padding: '15px',
            fontSize: '12px',
            paddingTop: index === 0 ? '20px' : '15px',
            backgroundColor: participant === Session.getCurrentUser().full_name ? 'rgba(19,30,61, 0.8)' : 'none'
          }}
        >
          <div
            className="pull-right"
            style={{
              marginTop: '4px',
              marginRight: '10px',
              width: '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: '#68E090'
            }}
          >
          </div>

          {/*<img*/}
            {/*src={participant.profile_picture_url}*/}
            {/*height={30}*/}
            {/*width={30}*/}
            {/*style={{*/}
              {/*borderRadius: '50%',*/}
              {/*marginRight: '10px',*/}
              {/*marginLeft: '20px',*/}
              {/*verticalAlign: 'middle'*/}
            {/*}}*/}
          {/*/>*/}

          <span
            key={`participant${index}`}
            style={{
              marginLeft: '67px',
            }}
          >
            {participant}
          </span>
        </div>
      );
    });
  }


  renderVideo(videoUrl, secondsAfterStartTime, isLive) {

    // this disables right click so that people can't right click to show controls or save video
    document.oncontextmenu = function () { // Use document as opposed to window for IE8 compatibility
      return false;
    };

    window.addEventListener('contextmenu', function (e) { // Not compatible with IE < 9
      e.preventDefault();
    }, false);

    // if video is not currently streaming, this starts the video at the beginning instead of the middle
    if(!this.isCurrentlyStreaming()) {
      secondsAfterStartTime = 0;
    }

    if(this.isYoutubeLink(videoUrl)) {
      return (
        <div
          style={{maxWidth: `${this.state.width}px`,
            position: 'relative'}}
          className="video-player-small"
        >
          {this.renderYoutubeVideo(videoUrl)}
        </div>
      )
    } else if(isLive) {
      return (
        <div
          style={{maxWidth: `${this.state.width}px`,
            position: 'relative'}}
          className="video-player-small">
          {this.renderLiveVideo(videoUrl, secondsAfterStartTime)}
        </div>
      )

    } else {
      // is an on-demand video
      return (
          <div
            style={{maxWidth: `${this.state.width}px`,
              position: 'relative'}}
            className="video-player-small">
            <Player ref="player" >
              <source src={videoUrl +"#t=" + secondsAfterStartTime } />
              <BigPlayButton position="center" />
              <ControlBar />
            </Player>
          </div>
      )
    }
  }

  // renders video without controls
  renderLiveVideo(videoUrl, secondsAfterStartTime) {
    return (
        <Player ref="player" autoPlay={true} muted={true} playsInline={true}>
          <source src={videoUrl +"#t=" + secondsAfterStartTime } />
          <BigPlayButton position="center" />

          <div
            style={{
              position: 'absolute',
              right: '0px',
              top: '-40px',
              width: '250px',
              zIndex: '1'
            }}
          >
            {this.renderLeaderboard()}
          </div>

          <ControlBar autoHide={false} disableDefaultControls>
            <PlayToggle />
            <VolumeMenuButton />
            <FullscreenToggle />
            <div
              className="pull-right"
              style={{
                position: 'absolute',
                left: '0px',
                top: '0px',
                zIndex: '1'
              }}>
              {/*<Metrics metric={Calories} ref="calories" />*/}
              {/*<Metrics metric={HeartRate} ref="heartRate"/>*/}
            </div>

            <div
              style={{
                position: 'absolute',
                right: '0px',
                top: '-40px',
                width: '250px',
                zIndex: '1'
              }}
            >
              {/*{this.renderLeaderboard()}*/}
            </div>

            <div
              style={{
                position: 'absolute',
                left: '10px',
                bottom: '5%',
                width: '25%',
                zIndex: '1'


              }}
            >
              {/*{this.renderOneVsOneBoard()}*/}
            </div>

            <div
            >
              {/*<LineGraph data={this.state.data1} colour={'orange'} ref="line1" />*/}
              {/*<LineGraph data={this.state.data2} colour={'rgba(82, 192, 83, 0.8)'} ref="line2" />*/}
            </div>
              <div
                className="pull-right"
                style={{
                  position: 'absolute', right: '70px',
                  marginTop: '10px',
                  marginRight: '10px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '7px',
                  backgroundColor: '#ff0000'
                }}
              >
                <div style={{marginLeft: '15px', fontFamily: 'Arimo', fontSize: '12px', marginTop: '-1px' }}>
                  Live
                </div>
              </div>
          </ControlBar>
        </Player>
    )
  }

  isYoutubeLink(videoUrl) {
    return videoUrl.includes("youtube")
  }

  renderYoutubeVideo(videoUrl) {
    return (
      <FixedAspectRatio ratio={'560:300'}>
        <iframe
          width={'100%'}
          height={'100%'}
          src={videoUrl + '?autoplay=1&mode=opaque&rel=0&autohide=1&showinfo=0&wmode=transparent'}
          frameBorder="0"
          // allow="autoplay; encrypted-media"
          sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation"
          allowFullScreen
        />
      </FixedAspectRatio>
    )
  }

  handleFullScreen() {
    let elem = document.getElementById("youtubeVideo");
    this.launchIntoFullscreen(elem);
  }

  getCourseStartTime() {
    return Moment(this.props.class_session.course_session.start_time);
  }

  getLiveStreamTime() {
    return Moment(this.props.class_session.course_session.start_time); // minus two minutes?
  }

  hasLiveStreamStarted(liveStreamTime) {
    return Moment().isAfter(Moment(liveStreamTime).subtract(5, 'seconds'));
  }

  isCurrentlyStreaming() {
    return this.hasLiveStreamStarted(this.getLiveStreamTime()) && this.isLiveStreamOngoing(this.getLiveStreamTime());
  }

  isLiveStreamOngoing(liveStreamTime) {
    return Moment().isBefore(Moment(liveStreamTime).add(this.props.class_session.course_session.duration, 'minutes'));
  }

  getSecondsAfterStartTime(startTime) {
    return Moment.duration(Moment().diff(Moment(startTime))).as('seconds');
  }

  //
  // launchIntoFullscreen(element) {
  //   if(element.requestFullscreen) {
  //     element.requestFullscreen();
  //   } else if(element.mozRequestFullScreen) {
  //     element.mozRequestFullScreen();
  //   } else if(element.webkitRequestFullscreen) {
  //     element.webkitRequestFullscreen();
  //   } else if(element.msRequestFullscreen) {
  //     element.msRequestFullscreen();
  //   }
  // }
  //
  // // TODO: MOVE TO UTILITY OR SERVICE FILE
  // capitalizeAllLetters(string) {
  //   return string.toUpperCase();
  // }

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

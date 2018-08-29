import React, { Component }     from 'react';
import {
  withRouter,
}                               from 'react-router-dom';
import API from "../services/api";

class AddCourseSessionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start_time: '',
      session_duration: 0,
      video_url: '',
      thumbnail_image_url: '',
      course_id: '',

      success: false
    }

    this.create_course_session = this.create_course_session.bind(this);
  }

  render() {
    console.log(this.state);
    let styles = {
      button: {
        width: '100%'
      }
    };
    return (
      <div>
        {this.renderSuccess()}

        Add Course Session

        <div className="m-t-15">
          Start Time:
          <input
            type="datetime-local"
            className="form-control"
            placeholder="Start Time"
            value={this.state.start_time}
            onChange={(e) => this.handleTextChange('start_time', e.target.value)}
          />
        </div>

        <div className="m-t-15">
          Duration(in minutes. This is optional and will override the default course duration) :
          <input
            type="number"
            className="form-control"
            placeholder="duration"
            value={this.state.session_duration}
            onChange={(e) => this.handleTextChange('session_duration', e.target.value)}
          />
        </div>

        <div className="m-t-15">
          Video URL:
          <input
            type="string"
            className="form-control"
            placeholder="Video Url"
            value={this.state.video_url}
            onChange={(e) => this.handleTextChange('video_url', e.target.value)}
          />
        </div>

        <div className="m-t-15">
          Thumbnail URL:
          <input
            type="string"
            className="form-control"
            placeholder="Thumbnail Image Url"
            value={this.state.thumbnail_image_url}
            onChange={(e) => this.handleTextChange('thumbnail_image_url', e.target.value)}
          />
        </div>

        <div className="m-t-15">
          Course:
          <select id="course"
          defaultValue=""
                  onChange={(e) => this.handleTextChange('course_id', e.target.value)}>
            <option value="" disabled> Select Course </option>
            {
              this.props.courses.map(function(course) {
              return <option
                             value={course.id}>{course.name}</option>
            })
            }
          </select>
        </div>

        {/*this is to choose a live or on demand video, the migration for adding a live bool is on a separate branch, so add this field back in when you've merged everything*/}
        {/*<div className="m-t-15">*/}
          {/*Live:*/}
          {/*<select id="live"*/}
                  {/*onChange={(e) => this.handleTextChange('live', e.target.value)}*/}
                  {/*defaultValue="">*/}
            {/*<option value="" disabled> Select Type</option>*/}
            {/*<option value="true"> Live Video </option>*/}
            {/*<option value="false"> On-demand </option>*/}
            {/*}*/}
          {/*</select>*/}
        {/*</div>*/}

        {this.renderSubmitButton(styles)}
      </div>
    )
  }

  renderSuccess() {
    if(this.state.success) {
      return (
        <div>
          Course session successfully added!
        </div>
      )
    } else {
      return;
    }
  }

  renderSubmitButton(styles) {
    // new user registering with email and password
    return (
      <button
        onClick={this.create_course_session}
        style={styles.button}
        type="button"
        className="btn btn-primary waves-effect w-md waves-light m-b-5 m-t-20"
      >
        Create Course Session
      </button>
    );
  }

  handleTextChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  constructCourseSessionFields(){
    return {
      course: {
        start_time: this.state.start_time,
        duration: this.state.session_duration,
        video_url: this.state.video_url,
        thumbnail_image_url: this.state.thumbnail_image_url,
        course_id: this.state.course_id ,
      }
    }
  }

  create_course_session() {
    API.createCourseSession(this.constructCourseSessionFields())
      .then(({course_session}) => {
        this.setState( {
          success: true
        })
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
}

export default withRouter(AddCourseSessionForm);
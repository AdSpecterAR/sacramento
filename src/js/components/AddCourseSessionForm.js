import React, { Component }     from 'react';
import {
  withRouter,
}                               from 'react-router-dom';

class AddCourseSessionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start_time: '',
      session_duration: 0,
      video_url: '',
      thumbnail_image_url: '',
      course: '',
      live: false,
    }
  }

  render() {

    return (
      <div>
        this is the add course sesion tab

        <div className="m-t-15">
          Start Time:
          <input
            type="datetime-local"
            className="form-control"
            placeholder="Start Time"
            value={this.state.start_time}
          />
        </div>

        <div className="m-t-15">
          Duration(in minutes. This is optional and will override the default course duration) :
          <input
            type="number"
            className="form-control"
            placeholder="duration"
            value={this.state.session_duration}
          />
        </div>

        <div className="m-t-15">
          Video URL:
          <input
            type="string"
            className="form-control"
            placeholder="Video Url"
            value={this.state.video_url}
          />
        </div>

        <div className="m-t-15">
          Thumbnail URL:
          <input
            type="string"
            className="form-control"
            placeholder="Thumbnail Image Url"
            value={this.state.thumbnail_image_url}
          />
        </div>

        <div className="m-t-15">
          Course:
          <select id="course">
            <option value="" disabled selected> Select Course </option>
            {
              this.props.courses.map(function(course) {
              return <option key={course.id}
                             value={course.name}>{course.name}</option>
            })
            }
          </select>
        </div>

        <div className="m-t-15">
          Live
          <input
            type="checkbox"
            className="form-control"
            // placeholder="equipment"
            value={this.state.live}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(AddCourseSessionForm);
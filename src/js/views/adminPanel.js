import React, { Component }     from 'react';
import {
  withRouter,
}                               from 'react-router-dom';
import API                      from '../services/api';
import {
  Tab, Tabs, TabList, TabPanel
}                               from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class AdminPanel extends Component {


  constructor(props) {
    super(props);

    this.state = {
      instructors: [],

      courseName: '',
      duration: 0,
      category: '',
      difficulty: '',
      instructor: '',
      description: '',
      equipment: '',

      start_time: '',
      session_duration: 0,
      video_url: '',
      thumbnail_image_url: '',
      course: '',
      live: false,

      first_name: '',
      last_name: '',
      email: '',
      password: '',
    }

    this.fetchInstructors = this.fetchInstructors.bind(this);
  }

  componentDidMount() {
    this.fetchInstructors();
  }

  render() {
    console.log(this.state.instructors);
    return (
      <div>
        <Tabs>
          <TabList>
            <Tab>Add Course</Tab>
            <Tab>Add Course Session</Tab>
            <Tab>Add Instructor</Tab>
          </TabList>

          <TabPanel>
            <div>
              Add Course

              <div className="m-t-15">

                Course Name:
                <input
                  type="string"
                  className="form-control"
                  placeholder="Course Name"
                  value={this.state.courseName}
                  // onChange={(e) => this.handleTextChange('lastName', e.target.value)}
                />
              </div>

              <div className="m-t-15">

                Duration(in minutes):
                <input
                  type="number"
                  className="form-control"
                  placeholder="duration"
                  value={this.state.duration}
                />
              </div>

              <div className="m-t-15">

                Category:
                <select id="category">
                  <option value="hiit"> HIIT </option>
                  <option value="yoga"> Yoga </option>
                  <option value="cardio"> Cardio </option>
                </select>
              </div>

              <div className="m-t-15">

                Difficulty:
                <select id="difficulty">
                  <option value="beginner"> Beginner </option>
                  <option value="intermediate"> Intermediate </option>
                  <option value="difficult"> Difficult </option>
                </select>
              </div>

              <div className="m-t-15">
                Instructor
                <select id="instructor">
                </select>
              </div>

              <div className="m-t-15">
                Description(optional):
                <input
                  type="string"
                  className="form-control"
                  placeholder="description"
                  value={this.state.description}
                />
              </div>

              <div className="m-t-15">
                Equipment(optional):
                <input
                  type="string"
                  className="form-control"
                  placeholder="equipment"
                  value={this.state.equipment}
                />
              </div>



            </div>
          </TabPanel>
          <TabPanel>
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
                <input
                  type="string"
                  className="form-control"
                  placeholder="Course"
                  value={this.state.course}
                />
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
          </TabPanel>
          <TabPanel>
            <div>
              this is the instructor tab
              {/*look up user, set instructor flag to true*/}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    )
  }

  //================
  // EVENT HANDLERS
  //================

  fetchInstructors() {
    API.getInstructors()
      .then(({users}) => {
        let { instructors } = users;

        this.setState({
          instructors
        });
      });
  }

}

export default withRouter(AdminPanel);
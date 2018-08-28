import React, { Component }     from 'react';
import {
  withRouter,
}                               from 'react-router-dom';
import API                      from '../services/api';
import {
  Tab, Tabs, TabList, TabPanel
}                               from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AddCourseForm            from '../components/AddCourseForm'
import AddCourseSessionForm     from '../components/AddCourseSessionForm'
import InstructorForm           from '../components/InstructorForm'

class AdminPanel extends Component {


  constructor(props) {
    super(props);

    this.state = {
      instructors: [],
      users: [],
      courses: [],

      first_name: '',
      last_name: '',
      email: '',
      password: '',
    }

    this.fetchInstructors = this.fetchInstructors.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.fetchCourses = this.fetchCourses.bind(this);
  }

  componentDidMount() {
    this.fetchInstructors();
    this.fetchUsers();
    this.fetchCourses();
  }

  render() {
    console.log(this.state.users);
    return (
      <div>
        <Tabs>
          <TabList>
            <Tab>Add Course</Tab>
            <Tab>Add Course Session</Tab>
            <Tab>Add Instructor</Tab>
          </TabList>

          <TabPanel>
            <AddCourseForm instructors={this.state.instructors}/>
          </TabPanel>

          <TabPanel>
            <AddCourseSessionForm courses={this.state.courses}/>
          </TabPanel>
          <TabPanel>
            <InstructorForm users={this.state.users}/>
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
      .then(({instructors}) =>
        this.setState({
          instructors
        }))
      .catch((response) => console.log('fetch instructors error', response))
  }

  fetchUsers() {
    API.getUsers()
      .then(({users}) =>
      this.setState({
        users
      }))
      .catch((response) => console.log('fetch users error', response))
  }

  fetchCourses() {
    API.getCourses()
      .then(({courses}) =>
      this.setState({
        courses
      }))
      .catch((response) =>console.log('fetch courses error', response))
  }

}

export default withRouter(AdminPanel);
import React, { Component }     from 'react';
import CoursesList              from "./coursesList";
import API                      from '../services/api';


export default class CoursesListContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      upcoming_courses: [],
      loading: true
    };

    this.fetchCourses = this.fetchCourses.bind(this);
  }

  componentDidMount() {
    this.fetchCourses();
  }

  render() {
    return !this.state.loading && (
      <CoursesList upcoming_courses={this.state.upcoming_courses} />
    );
  }


  //================
  // EVENT HANDLERS
  //================


  fetchCourses() {
    API.getCourses()
      .then(({courses}) => {
        let { upcoming_courses } = courses;

        this.setState({
          upcoming_courses,
          loading: false
        });
      });
  }

}
import React, { Component }     from 'react';
import CoursesList              from "./coursesList";
import API                      from '../services/api';


const coursesResponse = {
  courses: {
    upcoming_courses: [
      {
        id: 1,
        name: 'HIIT',
        start_time: '2018-07-19 17:39:22 -0600',
        video_url: 'www.adspecter.com',
        duration: 30,
        thumbnail_image_url: 'https://res.cloudinary.com/classpass/image/upload/x_0,y_19,w_848,h_478,c_crop/h_894/usdzus21sro35bbhpp2p.jpg',
        instructor_name: 'Jamie Foxx'
      },
      {
        id: 2,
        name: 'Cardio',
        start_time: '2018-07-19 19:39:22 -0600',
        video_url: 'www.google.com',
        duration: 45,
        thumbnail_image_url: 'https://res.cloudinary.com/classpass/image/upload/x_0,y_81,w_915,h_515,c_crop/h_894/rvwpyulznnmv1ddwrr9b.jpg',
        instructor_name: 'Lamie Boxx'
      }
    ]
  }
};

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
    this.setState({
      upcoming_courses: coursesResponse.courses.upcoming_courses,
      loading: false
    });

    // this.fetchCourses();
  }

  render() {
    return !this.state.loading && (
      <CoursesList upcoming_courses={this.state.upcoming_courses} />
    );
  }

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
import React, { Component }     from 'react';
import Moment                   from 'moment';
import { Link }                 from 'react-router-dom';
import FixedAspectRatio         from '../services/fixedAspectRatio';

const programs = [
  {
    thumbnail_image_url: 'https://s3-us-west-1.amazonaws.com/cloudworkout/GroupHIIT.png',
    id: 1,
    course: {
      name: 'Group HIIT 30 Day Bootcamp'
    },
    start_time: '2018-08-06T14:00:00.665Z',
    instructor_full_name: 'Group HIIT'
  },
  // {
  //   thumbnail_image_url: 'https://res.cloudinary.com/classpass/image/upload/x_0,y_19,w_848,h_478,c_crop/h_894/usdzus21sro35bbhpp2p.jpg',
  //   course: {
  //     name: 'Shadow Boxing 101'
  //   },
  //   instructor_full_name: 'Casey Folks'
  // },
];

const onDemandVideos = [
  {
    id: 1,
    thumbnail_image_url: 'https://res.cloudinary.com/classpass/image/upload/x_0,y_19,w_848,h_478,c_crop/h_894/usdzus21sro35bbhpp2p.jpg',
    course: {
      name: 'Core crunch'
    },
    instructor_full_name: 'Taylor Soh',
    duration: 25,
    start_time: '2018-08-02T15:00:00.665Z'
  },
  {
    id: 1,
    thumbnail_image_url: 'https://s3-us-west-1.amazonaws.com/thumbnail-pics/2211261-attractive-man-doing-pushups-in-the-gym-human-being-photocase-stock-photo-large.jpeg',
    course: {
      name: 'Strength and Conditioning'
    },
    instructor_full_name: 'Steven Kpa',
    duration: 60,
    start_time: '2018-08-02T17:00:00.665Z'
  },
  {
    id: 1,
    thumbnail_image_url: 'https://s3-us-west-1.amazonaws.com/thumbnail-pics/517231346-612x612.jpg',
    course: {
      name: 'Core crunch'
    },
    instructor_full_name: 'Taylor Soh',
    duration: 25,
    start_time: '2018-08-02T15:00:00.665Z'
  },
  {
    id: 1,
    thumbnail_image_url: 'https://s3-us-west-1.amazonaws.com/thumbnail-pics/stock-photo--man-and-woman-strengthen-hands-at-fitness-training-571976104.jpg',
    course: {
      name: 'Cardio'
    },
    instructor_full_name: 'Taylor Soh',
    duration: 25,
    start_time: '2018-08-02T15:00:00.665Z'
  }
];

export default class CoursesList extends Component {

  render() {
    return (
      <div style={{marginBottom: '80px'}}>
        {this.renderBanner()}

        <div style={{marginTop: '50px'}}>
          {this.renderCourseSection('Upcoming live classes', this.props.upcoming_courses)}
        </div>

        <div style={{marginTop: '70px'}}>
          {this.renderCourseSection('Programs', programs)}
        </div>

        <div style={{marginTop: '70px'}}>
          {this.renderCourseSection('On-demand classes', onDemandVideos)}
        </div>
      </div>
    );
  }


  //================
  // RENDER METHODS
  //================


  // used for Group HIIT demo
  renderBanner() {
    let nextCourse = this.props.upcoming_courses[0];

    return nextCourse && (
      <Link to="/class/2">
        <FixedAspectRatio ratio={'560:300'}>
          <div style={{width: '100%', height: '100%', position: 'relative'}}>
            <img
              src={nextCourse.thumbnail_image_url}
              width="100%"
              // style={{marginTop: '-260px'}}
            />

            <div style={{position: 'absolute', bottom: '30px', left: '30px', color: 'white'}}>
              <div className="label-danger" style={{width: '120px', padding: '5px', textAlign: 'center', borderRadius: '3px'}}>
                <b>
                  Live at {Moment(nextCourse.start_time).format('h:mma')}
                </b>
              </div>

              <h4 style={{color: 'white', marginBottom: '0'}}>
                Day 3 - Fat Loss Challenge
              </h4>

              <div>
                Group HIIT
              </div>

              <div>
                45 Minutes
              </div>
            </div>
          </div>
        </FixedAspectRatio>
      </Link>
    );
  }

  renderCourseSection(title, courses) {
    return courses.length > 0 && (
      <div>
        <h3>
          {title}
        </h3>

        <div className="m-t-25 row">
          {this.renderCourses(courses)}
        </div>
      </div>
    );
  }

  renderCourses(courses) {
    return courses.map((course, index) => {
      return (
        <div
          className="col-sm-3 col-m-6 m-b-10"
          key={`upcomingCourse${index}`}
          style={{maxHeight: '225px', cursor: 'pointer'}}
        >
          <Link to={`/class/${course.id}`}>
            <div
              style={{}}
            >
              <FixedAspectRatio ratio={'450:250'}>
                <img
                  style={{maxWidth: '100%'}}
                  src={course.thumbnail_image_url}
                  alt=""
                />
              </FixedAspectRatio>
            </div>

            <div className="m-t-15">
              <b style={{fontSize: '15px'}}>
                {course.course.name}
              </b>

              <div style={{width: '200px'}}>
                {Moment(course.start_time).format('dddd, MMMM Do, h:mm a')}
              </div>

              <div>
                {course.instructor_full_name}
              </div>

              <div>
                {course.duration && `${course.duration} minutes`}
              </div>
            </div>
          </Link>
        </div>
      );
    });
  }

}

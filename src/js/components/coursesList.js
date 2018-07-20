import React, { Component }     from 'react';
import Moment                   from 'moment';


export default class CoursesList extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        <div className="row">
          <h2>
            Upcoming live classes
          </h2>
        </div>

        <div className="m-t-25">
          {this.renderCourses()}
        </div>
      </div>
    );
  }

  renderCourses() {
    return this.props.upcoming_courses.map((course, index) => {
      return (
        <div
          className="row card-box"
          key={`upcomingCourse${index}`}
          style={{width: '600px', maxHeight: '200px', cursor: 'pointer'}}
        >
          <div
            className="col-sm-8"
            style={{marginTop: '-22px', marginLeft: '-32px'}}
          >
            <img
              style={{maxHeight: '199px'}}
              src={course.thumbnail_image_url}
              alt=""
            />
          </div>

          <div className="col-sm-4">
            <h3>
              {course.name}
            </h3>

            <div>
              {course.instructor_full_name}
            </div>

            <div style={{width: '200px'}}>
              {Moment(course.start_time).format('dddd, MMMM Do, h:mm a')}
            </div>

            <div>
              <i>
                {course.duration} minutes
              </i>
            </div>
          </div>
        </div>
      );
    });
  }

}
import React, { Component }     from 'react';
import {
  withRouter,
}                               from 'react-router-dom';

class AddCourseForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      courseName: '',
      duration: 0,
      category: '',
      difficulty: '',
      instructor: '',
      description: '',
      equipment: '',
    }
  }

  render() {

    return (
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
            <option value="" disabled selected> Select category</option>
            <option value="hiit"> HIIT </option>
            <option value="yoga"> Yoga </option>
            <option value="cardio"> Cardio </option>
          </select>
        </div>

        <div className="m-t-15">

          Difficulty:
          <select id="difficulty">
            <option value='' disabled selected> Select difficulty </option>
            <option value="beginner"> Beginner </option>
            <option value="intermediate"> Intermediate </option>
            <option value="difficult"> Difficult </option>
          </select>
        </div>

        <div className="m-t-15">
          Instructor
          <select id="instructor">
            <option value="" disabled selected>Select Instructor</option>
            {
              this.props.instructors.map(function(user){
                return <option key={user.id}
              value={user.full_name}>{user.full_name}</option>

            })
            }
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
    )
  }
}

export default withRouter(AddCourseForm);
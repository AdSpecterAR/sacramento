import React, { Component }     from 'react';
import {
  withRouter,
}                               from 'react-router-dom';
import API from "../services/api";

class AddCourseForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      courseName: '',
      duration: 0,
      category: '',
      difficulty: '',
      instructor_id: '',
      description: '',
      equipment: '',

      success: false
    }

    this.create_course = this.create_course.bind(this);
  }

  render() {

    let styles = {
      button: {
        width: '100%'
      }
    };
    return (
      <div>
        {this.renderSuccess()}

        * required

        <div className="m-t-15">

          *Course Name:
          <input
            type="string"
            className="form-control"
            placeholder="Course Name"
            value={this.state.courseName}
            onChange={(e) => this.handleTextChange('courseName', e.target.value)}
          />
        </div>

        <div className="m-t-15">

          *Duration(in minutes):
          <input
            type="number"
            className="form-control"
            placeholder="duration"
            value={this.state.duration}
            onChange={(e) => this.handleTextChange('duration', e.target.value)}
          />
        </div>

        <div className="m-t-15">

          *Category:
          <select id="category"
                  onChange={(e) => this.handleTextChange('category', e.target.value)}
                  defaultValue=""
          >
            <option value="" disabled> Select category</option>
            <option value="hiit"> HIIT </option>
            <option value="yoga"> Yoga </option>
            <option value="cardio"> Cardio </option>
          </select>
        </div>

        <div className="m-t-15">

          *Difficulty:
          <select id="difficulty"
                  onChange={(e) => this.handleTextChange('difficulty', e.target.value)}
                  defaultValue="">
            <option value='' disabled> Select difficulty </option>
            <option value="beginner"> Beginner </option>
            <option value="intermediate"> Intermediate </option>
            <option value="challenging"> Challenging </option>
          </select>
        </div>

        <div className="m-t-15">
          *Instructor
          <select id="instructor"
                  onChange={(e) => this.handleTextChange('instructor_id', e.target.value)}
                  defaultValue="">
            <option value="" disabled>Select Instructor</option>
            {
              this.props.instructors.map(function(user){
                return <option
              value={user.id}>{user.full_name}</option>

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
            onChange={(e) => this.handleTextChange('description', e.target.value)}
          />
        </div>

        <div className="m-t-15">
          Equipment(optional):
          <input
            type="string"
            className="form-control"
            placeholder="equipment"
            value={this.state.equipment}
            onChange={(e) => this.handleTextChange('equipment', e.target.value)}
          />
        </div>

        {this.renderSubmitButton(styles)}

      </div>
    )
  }

  renderSuccess() {
    if(this.state.success) {
      return (
        <div>
          Course successfully added!
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
        onClick={this.create_course}
        style={styles.button}
        type="button"
        className="btn btn-primary waves-effect w-md waves-light m-b-5 m-t-20"
      >
        Create Course
      </button>
    );
  }

  handleTextChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  constructCourseFields(){
    return {
      course: {
        name: this.state.courseName,
        duration: this.state.duration,
        category: this.state.category,
        difficulty: this.state.difficulty,
        instructor_id: this.state.instructor_id,
        description: this.state.description,
        equipment: this.state.equipment
      }
    }
  }

  create_course() {
    API.createCourse(this.constructCourseFields())
      .then(({course}) => {
        this.setState( {
          success: true
        })
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
}

export default withRouter(AddCourseForm);
import React, { Component }     from 'react';
import {
  withRouter,
}                               from 'react-router-dom';

class InstructorForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user_id: 0,
      instructor: false
    }
  }

  render() {
    return (
      <div>
        Add Instructor
        <div className="m-t-15">
          Instructor
          <select id="instructor">
            <option value="" disabled selected>Select Users</option>
            {
              this.props.users.map(function(user){
                return <option key={user.id}
                               value={user.full_name}>{user.full_name}</option>

              })
            }
          </select>
        </div>

        <div className="m-t-15">
          Instructor
          <input
            type="checkbox"
            className="form-control"
            // placeholder="equipment"
            value={this.state.instructor}
          />
        </div>

      </div>
    )
  }
}

export default withRouter(InstructorForm);
import React, { Component }     from 'react';
import {
  withRouter,
}                               from 'react-router-dom';
import ReactTable               from "react-table";
import 'react-table/react-table.css'
import Modal                    from '../services/modal';
import API from "../services/api";

class InstructorForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',

      showModal: false
    }

    this.register = this.register.bind(this);
  }

  render() {
    return (
      <div>

        {this.renderInstructorForm()}

        <button
          onClick={() => this.openInstructorModalWithProps()}
          type="button"
          className="btn btn-primary waves-effect w-md waves-light m-b-5 m-t-20"
          >
          Add Instructor
        </button>
        <div>
          {this.renderInstructorTable()}
        </div>
      </div>
    )
  }

  //================
  // RENDER METHODS
  //================

  renderInstructorTable() {
    const columns = [{
      Header: 'ID',
      accessor: 'id'
    }, {
      Header: 'Name',
      accessor: 'full_name'
    }, {
      Header: 'Email',
      accessor: 'email'
    }]

    return (
      <ReactTable
        data={this.props.instructors}
        columns={columns}
      />
    )
  }

  renderInstructorForm() {
    let styles = {
      button: {
        width: '100%'
      }
    };

    return (
      <Modal
        showModal={this.state.showModal}
        showCloseButton={true}
        // onCloseCallback={}
      >
        <div className="card-box white" style={{minHeight: '200px'}}>
          <div style={{textAlign: 'center'}}>
            <img
              style={{width: '300px'}}
              src="https://s3-us-west-1.amazonaws.com/cloudworkout/Grayscale+on+Transparent.png"
            />
          </div>

          <div className="m-t-15">
            <input
              type="string"
              className="form-control"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={(e) => this.handleTextChange('firstName', e.target.value)}
            />
          </div>


          <div className="m-t-15">
            <input
              type="string"
              className="form-control"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={(e) => this.handleTextChange('lastName', e.target.value)}
            />
          </div>


          <div className="m-t-15">
            <input
              type="email"
              className="form-control"
              placeholder="email"
              value={this.state.email}
              onChange={(e) => this.handleTextChange('email', e.target.value)}
            />
          </div>

          <div className="m-t-15">
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={this.state.password}
              onChange={(e) => this.handleTextChange('password', e.target.value)}
            />
          </div>

          {this.renderSubmitButton(styles)}

        </div>
      </Modal>
    )
  }

  renderSubmitButton(styles) {
    // new user registering with email and password
    return (
      <button
        onClick={this.register}
        style={styles.button}
        type="button"
        className="btn btn-primary waves-effect w-md waves-light m-b-5 m-t-20"
      >
        Register New Instructor
      </button>
    );
  }

  openInstructorModalWithProps() {
    this.setState( {
      showModal: true
    })
  }

  closeInstructorModal() {
    this.setState( {
      showModal: false
    })
  }

  handleTextChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  constructUserRegistrationCredentials() {
    return {
      user: {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      }
    }
  }

  register() {
    API.registerNewInstructor(this.constructUserRegistrationCredentials())
      .then(({user}) => {
        {this.closeInstructorModal()}
        {this.renderInstructorTable()}
        window.location.reload();

      })
      .catch((error) => {
        console.log('error', error);
      });
  }
}

export default withRouter(InstructorForm);

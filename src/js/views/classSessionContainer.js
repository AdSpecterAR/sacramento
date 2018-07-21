import React, { Component }     from 'react';
import API                      from '../services/api';
import ClassSession             from './classSession';
import Session                  from '../services/session';


export default class ClassSessionContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      class_session: {},
      loading: true
    };

    this.fetchClassSession = this.fetchClassSession.bind(this);
    this.setUserCourseSession = this.setUserCourseSession.bind(this);
  }

  componentDidMount() {
    this.fetchClassSession();
  }

  render() {
    return !this.state.loading && (
      <ClassSession
        class_session={this.state.class_session}
        setUserCourseSession={this.setUserCourseSession}
      />
    );
  }

  fetchClassSession() {
    let params = {
      query: {
        userId: Session.getCurrentUser().id,
        courseSessionId: this.props.match.params.classId
      }
    };

    API.getUserCourseSession(params)
      .then(({user_course_session}) => {
        this.setUserCourseSession(user_course_session);
      });
  }

  setUserCourseSession(userCourseSession) {
    console.log('herro');
    this.setState({
      class_session: userCourseSession,
      loading: false
    });
  }
  
}
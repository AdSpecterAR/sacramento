import React, { Component }     from 'react';
import API                      from '../services/api';
import ClassSession             from './classSession';
import Session                  from '../services/session';


export default class ClassSessionContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      class_session: {},
      participants: [],
      loading: true
    };

    this.fetchClassSession = this.fetchClassSession.bind(this);
    this.setUserCourseSession = this.setUserCourseSession.bind(this);
    this.getStudentNames = this.getStudentNames.bind(this);
  }

  componentDidMount() {
    this.fetchClassSession();
    this.interval = setInterval(this.getStudentNames, 5000);
  }

  getStudentNames() {
    API.getCourseSessionStudents({id: this.props.match.params.classId})
      .then(({participants}) => this.setState({participants}))
      .catch((response) => console.log('fetch live student count error', response));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return !this.state.loading && (
      <ClassSession
        class_session={this.state.class_session}
        setUserCourseSession={this.setUserCourseSession}
        participants={this.state.participants}
      />
    );
  }


  //================
  // EVENT HANDLERS
  //================


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
    this.setState({
      class_session: userCourseSession,
      loading: false
    });
  }
  
}

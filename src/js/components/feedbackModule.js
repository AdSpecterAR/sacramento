import React, { Component }     from 'react';
import API                      from '../services/api';

const COURSE_RATING_THUMBS_UP = 'thumbs_up';
const COURSE_RATING_THUMBS_DOWN = 'thumbs_down';
const VALID_RATINGS = [
  COURSE_RATING_THUMBS_UP,
  COURSE_RATING_THUMBS_DOWN
];


export default class FeedbackModule extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rating: props.classSession.rating || null,
      feedbackComment: props.classSession.comment || '',
    };

    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.submitFeedback = this.submitFeedback.bind(this);
    this.selectRating = this.selectRating.bind(this);
  }

  render() {
    return (
      <div className="row">
        <div className="card-box col-sm-4">
          {!this.hasExistingFeedback() ? this.renderFeedbackModule() : this.renderToastScreen()}
        </div>
      </div>
    );
  }

  renderFeedbackModule() {
    return (
      <div>
        <div>
          What did you think of this class?
        </div>

        <button
          onClick={() => this.selectRating(COURSE_RATING_THUMBS_UP)}
          type="button"
          className="btn btn-primary waves-effect w-md waves-light m-b-5 m-t-20"
        >
          Thumbs Up
        </button>

        <button
          onClick={() => this.selectRating(COURSE_RATING_THUMBS_DOWN)}
          type="button"
          className="btn btn-primary waves-effect w-md waves-light m-b-5 m-t-20"
        >
          Thumbs Down
        </button>

        <textarea
          className="form-control"
          placeholder='Additional thoughts (optional)'
          value={this.state.feedbackComment}
          onChange={this.handleCommentChange}
        />

        <button
          onClick={this.submitFeedback}
          type="button"
          className="btn btn-primary waves-effect w-md waves-light m-b-5 m-t-20"
        >
          Submit
        </button>
      </div>
    );
  }

  renderToastScreen() {
    return (
      <div>
        THANK YOU FOR YOUR FEEDBACK!!!!
      </div>
    );
  }


  //================
  // EVENT HANDLERS
  //================


  selectRating(rating) {
    this.setState({rating});
  }

  submitFeedback() {
    API.submitCourseFeedback(this.constructFeedbackPostData())
      .then(({user_course_session}) => {
        this.props.setUserCourseSession(user_course_session);
      })
  }

  handleCommentChange(e) {
    this.setState({
      feedbackComment: e.target.value
    });
  }


  //=================
  // PRIVATE METHODS
  //=================


  constructFeedbackPostData() {
    return {
      user_course_session_id: this.props.classSession.id,
      user_course_session: {
        rating: this.state.rating,
        comment: this.state.feedbackComment
      }
    }
  }

  hasExistingFeedback() {
    let { rating, comment } = this.props.classSession;

    return rating === COURSE_RATING_THUMBS_UP ||
      rating === COURSE_RATING_THUMBS_UP ||
      (comment !== '' || comment !== null);
  }
}

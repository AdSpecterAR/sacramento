import React, { Component }           from 'react';


class Toast extends Component {

  render() {
    return (
      <div className="text-center">
        <div
          className="sweet-alert sweet-alert-override showSweetAlert visible"
          tabIndex="-1"
          data-has-cancel-button="false"
          data-has-confirm-button="true"
          data-allow-ouside-click="false"
          data-has-done-function="false"
          data-timer="null"
          style={{display: 'block'}}
        >
          <div>
            <div
              className="icon success animate"
              style={{display: 'block'}}
            >
              <span className="line tip animateSuccessTip" />
              <span className="line long animateSuccessLong" />

              <div className="placeholder"></div>
              <div className="fix"></div>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{color: '#4E516A'}}>
            {this.props.toastMessage || 'Thank you!'}
          </h3>

          <button
            onClick={this.props.onClickToastButton}
            type="button"
            className="btn btn-success btn-rounded w-lg m-t-25"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

}


export default Toast;

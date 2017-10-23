import React                      from 'react';
import {TransitionMotion, spring} from 'react-motion';
import CloseIcon                  from '../../icons/closeIcon';

class Modal extends React.Component {

  render() {
    return (
      <TransitionMotion
        styles={this.getModalStyles()}
        willEnter={this.enterStyle}
        willLeave={this.leaveStyle}>

        {this.renderInterpolatedStyledModal()}
      </TransitionMotion>
    );
  }


  // PRIVATE METHODS


  getModalStyles() {
    return this.props.showModal ? [
      {
        key: 'modalBackground',
        style: {
          opacity: spring(1, {
            stiffness: 210,
            damping: 20
          })
        }
      },
      {
        key: 'modalContainer',
        style: {
          top: spring(0, {
            stiffness: 160,
            damping: 17
          })
        }
      }
    ] : [];
  }

  enterStyle({key}) {
    switch (key) {
      case 'modalContainer':
        return {
          top: -800
        };

      case 'modalBackground':
        return {
          opacity: 0
        };
      default:
        return {};
    }
  }

  leaveStyle({key}) {
    switch (key) {
      case 'modalContainer':
        return {
          top: spring(-800, {
            stiffness: 160,
            damping: 17
          })
        };

      case 'modalBackground':
        return {
          opacity: spring(0, {
            stiffness: 210,
            damping: 20
          })
        };
      default:
        return {};
    }
  }

  renderModalCloseButton() {
    return (
      <button
        className="modal-close"
        onClick={this.props.onCloseCallback}>

        <CloseIcon fillClass={'fill-white'} />
      </button>
    );
  }

  renderInterpolatedStyledModal() {
    return ([modalBackground, modalContainer]) => modalBackground && modalContainer ? (
      <div className="modal-background" style={modalBackground.style}>
        <div className="modal-container" style={modalContainer.style}>
          {this.props.showCloseButton ? this.renderModalCloseButton() : null}

          {this.props.children}
        </div>
      </div>
    ) : null;
  }

}


export default Modal;

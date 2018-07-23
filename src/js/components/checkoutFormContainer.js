import React, { Component }     from 'react';
import { Elements }             from 'react-stripe-elements';
import CheckoutForm             from './checkoutForm';
import Modal                    from '../services/modal';


export default class CheckoutFormContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      description: '',
      amount: null,
      shouldShowModal: false,
      isSubscription: false
    };

    this.handleCloseChargeModal = this.handleCloseChargeModal.bind(this);
  }

  render() {
    return (
      <div>
        <button
          onClick={() => this.openChargeModalWithProps('One class purchase', 500, false)}
          type="button"
          className="btn btn-primary waves-effect w-md waves-light m-b-5 m-t-20"
        >
          Purchase 1 class
        </button>

        <button
          onClick={() => this.openChargeModalWithProps('Monthly subscription with 14 day trial', 3000, true)}
          type="button"
          className="m-l-15 btn btn-primary waves-effect w-md waves-light m-b-5 m-t-20"
        >
          Monthly subscription 14 day trial
        </button>

        {this.renderCheckoutForm()}
      </div>
    );
  }

  renderCheckoutForm() {
    return (
      <Modal
        showModal={this.state.shouldShowModal}
        showCloseButton={true}
        onCloseCallback={this.handleCloseChargeModal}
      >
        <div className="card-box white" style={{minHeight: '200px'}}>
          <Elements>
            <CheckoutForm
              handleCloseChargeModal={this.handleCloseChargeModal}
              description={this.state.description}
              amount={this.state.amount}
              isSubscription={this.state.isSubscription}
            />
          </Elements>
        </div>
      </Modal>
    );
  }

  openChargeModalWithProps(description, amount, isSubscription) {
    this.setState({
      description,
      amount,
      isSubscription,
      shouldShowModal: true
    });
  }

  handleCloseChargeModal() {
    this.setState({
      description: '',
      amount: null,
      shouldShowModal: false,
      isSubscription: false
    });
  }
}

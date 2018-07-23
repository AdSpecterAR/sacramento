import React, { Component }     from 'react';
import {
  CardElement,
  injectStripe
}                               from 'react-stripe-elements';
import API                      from '../services/api';
import Session                  from '../services/session';


class CheckoutForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      shouldShowInvalidCardError: false
    };

    this.submit = this.submit.bind(this);
  }

  submit(ev) {
    Promise.resolve(this.props.stripe.createToken())
      .then(({token}) => {
        API.postCharges(this.constructChargeData(token))
          .then((response) => {
            // TODO: USE RESPONSE STATUS INSTEAD OF RESPONSE MESSAGE
            if (response.message === 'Successful charge!') this.props.handleCloseChargeModal();
          });
      })
      .catch(({response}) => {
        console.log('Stripe error response', response);
        this.setState({shouldShowInvalidCardError: true});
      });
  }

  constructChargeData(token) {
    return {
      charge: {
        user_id: Session.getCurrentUser().id,
        stripeToken: token.id,
        description: this.props.description,
        amount: this.props.amount,
        currency: 'usd'
      }
    }
  }

  render() {
    let style = {
      base: {
        color: '#32325d',
        lineHeight: '18px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    return (
      <div className="checkout" style={{background: 'white'}}>
        <p className="m-t-25">
          Would you like to complete the purchase?
        </p>

        <CardElement className="m-t-25" style={style} />

        <p className="m-t-10" style={{color: '#fa755a', height: '20px'}}>
          {this.state.shouldShowInvalidCardError && 'Invalid card information'}
        </p>

        <button
          onClick={this.submit}
          className="pull-right btn btn-info waves-effect w-md waves-light m-b-5"
        >
          Submit
        </button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);

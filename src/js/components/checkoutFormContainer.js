import React, { Component }     from 'react';
import { Elements }             from 'react-stripe-elements';
import CheckoutForm             from './checkoutForm';


export default class CheckoutFormContainer extends Component {

  render() {
    return (
      <Elements>
        <CheckoutForm />
      </Elements>
    );
  }

}

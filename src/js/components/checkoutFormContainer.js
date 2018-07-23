import React, { Component }     from 'react';
import { Elements }             from 'react-stripe-elements';
import CheckoutForm             from './checkoutForm';


export default class CheckoutFormContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {

    return (
      <Elements>
        <CheckoutForm />
      </Elements>
    );
  }

}
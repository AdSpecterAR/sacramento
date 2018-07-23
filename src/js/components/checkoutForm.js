import React, { Component }     from 'react';
import {
  CardElement,
  injectStripe
}                               from 'react-stripe-elements';
import API                      from '../services/api';


class CheckoutForm extends Component {

  constructor(props) {
    super(props);

    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  submit(ev) {
    Promise.resolve(this.props.stripe.createToken())
      .then(({token}) => {
        API.postCharges(this.constructChargeData(token))
          .then((response) => {
            // TODO: USE RESPONSE STATUS INSTEAD OF RESPONSE MESSAGE
            if (response.message === 'Successful charge!') this.setState({complete: true});
          });
      });
  }

  constructChargeData(token) {
    return {
      charge: {
        stripeToken: token.id,
        description: 'hi',
        amount: 500,
        currency: 'usd'
      }
    }
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

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
        <p>Would you like to complete the purchase?</p>

        <CardElement style={style} />

        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);

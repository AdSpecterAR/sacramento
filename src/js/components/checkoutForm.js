import React, { Component }     from 'react';
import {
  CardElement,
  injectStripe
}                               from 'react-stripe-elements';


class CheckoutForm extends Component {

  constructor(props) {
    super(props);

    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    let response = await fetch("/charge", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: {charge: {stripeToken: token, description: 'hi',  amount: 500, currency: 'usd'}}
    });

    if (response.ok) console.log("Purchase Complete!")
    if (response.ok) this.setState({complete: true});
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

    if (this.state.complete) return <h1>Purchase Complete</h1>;
    
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

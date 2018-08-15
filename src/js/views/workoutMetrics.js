import React, { Component }     from 'react';


export const HeartRate = 'Heart Rate';
export const Calories = 'Calories';

//Metrics handles the rendering and changing values of the heart rate and calories
export default class Metrics extends Component {
  constructor(props) {
    super(props);

    let calories = 0;
    let heartRate = 80;

    this.state = {
      calories,
      heartRate
    }

    this.addCalories = this.addCalories.bind(this);
    this.addHeartRate = this.addHeartRate.bind(this);
  }

  addCalories() {
    //randomly either adds 1 or 0 calories every interval
    let addedCalories = Math.round(Math.random());

    this.setState({
      calories: this.state.calories + addedCalories
    });
  }

  addHeartRate() {
    //raises heart rate until minimum and then keeps it between the minimum and maximum
    let addedHeartRate = 0;
    let minHeartRate = 150;
    let maxHeartRate = 165;

    if (this.state.heartRate < minHeartRate) {
      addedHeartRate = Math.random() * 7;

    } else if (this.state.heartRate > maxHeartRate) {
      addedHeartRate = Math.random() * -4;

    } else {
      let max = 5;
      let min = -5;
      addedHeartRate = Math.random() * (max - min) + min;
    }

    this.setState({
      heartRate: this.state.heartRate + Math.round(addedHeartRate)
    });
  }

  componentDidMount() {
    this.interval = setInterval(this.addCalories, 4500);
    this.interval = setInterval(this.addHeartRate, 3500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let metric = this.props.metric;
    let imageUrl = '';
    let measurement = '';

    if (metric === Calories) {
      imageUrl = 'https://s3-us-west-1.amazonaws.com/cloudworkout/fire+emoji.png';
      measurement = this.state.calories;

    } else if (metric === HeartRate) {
      imageUrl = 'https://s3-us-west-1.amazonaws.com/cloudworkout/heart+emoji.png';
      measurement = this.state.heartRate;

    } else {
      console.log("Invalid metric");
      return;
    }

    return (
      <div style={{margin: '10px', fontFamily: 'Arimo', fontSize: '16px', display: 'inline-block'}} className="metric">
        <img src={imageUrl} style={{height: '15px', margin: '8px', marginBottom: '11px'}}/>

        {metric}

        <div style={{marginLeft: '30px', textAlign: 'center', fontFamily: 'Arimo', fontSize: '28px'}}>
          {measurement}
        </div>
      </div>
    )
  }
}
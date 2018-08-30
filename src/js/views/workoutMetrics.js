import React, { Component }     from 'react';


export const HeartRate = 'Heart Rate';
export const Calories = 'Calories';

//Metrics handles the rendering and changing values of the heart rate and calories
export default class Metrics extends Component {
  constructor(props) {
    super(props);
    //70 calories
    let calories = [32, 32, 32, 33, 33, 34, 35, 35, 36, 36,
      37, 37, 38, 39, 40, 40, 41, 42, 43, 44,
      45, 45, 46, 47, 47, 48, 49, 50, 51, 51,
      52, 53, 53, 54, 54, 55, 56, 57, 57, 58,
      59, 60, 60, 61, 62, 63, 64, 64, 65, 65,
      66, 67, 67, 68, 69, 69, 69, 70, 71, 72,
      73, 74, 75, 76, 76, 77, 78, 79, 80, 81,
      81, 82, 83, 84, 85, 86, 87];
    let calorieIndex = 0;
    let heartRate =
      [148, 145, 147, 148, 150, 152, 154 ,159, 161, 163,
      167, 164, 168, 171, 167, 169, 167, 164, 165, 164,
      163, 168, 164, 165, 165, 169, 171, 165, 163, 161,
      159, 158, 160, 157,165, 168,  168, 169, 170, 173,
      174, 172, 169, 167, 165, 163, 164, 162, 160, 163,
      164, 165, 167, 168, 169, 169, 168, 166, 165, 166,
      168, 169, 168, 170, 171, 173, 174, 175, 174, 176,
      174, 173, 175, 171, 170, 169, 168, 170, 168, 167,
      165, 164, 163, 166, 168, 169, 168, 167, 169, 170,
      171, 173, 173, 171, 170, 168, 165, 167, 164, 167 ]
    let heartRateIndex = 0;

    this.state = {
      calories,
      heartRate,
      calorieIndex,
      heartRateIndex
    }

    this.addCalories = this.addCalories.bind(this);
    this.addHeartRate = this.addHeartRate.bind(this);
    this.resetCalories = this.resetCalories.bind(this);
    this.resetHeartRate = this.resetHeartRate.bind(this);
  }

  resetCalories() {
    this.setState({
      calorieIndex: 0
    })
  }

  resetHeartRate() {
    this.setState({
      heartRateIndex: 0
    })
  }

  addCalories() {
    //randomly either adds 1 or 0 calories every interval
    // let addedCalories = Math.round(Math.random());
    if(this.state.calorieIndex == this.state.calories.length) {
      this.state.calorieIndex = -1;
    }
    this.setState({
      calorieIndex: this.state.calorieIndex + 1
    });
  }

  addHeartRate() {
    //raises heart rate until minimum and then keeps it between the minimum and maximum
    // let addedHeartRate = 0;
    // let minHeartRate = 150;
    // let maxHeartRate = 165;
    //
    // if (this.state.heartRate < minHeartRate) {
    //   addedHeartRate = Math.random() * 7;
    //
    // } else if (this.state.heartRate > maxHeartRate) {
    //   addedHeartRate = Math.random() * -4;
    //
    // } else {
    //   let max = 5;
    //   let min = -5;
    //   addedHeartRate = Math.random() * (max - min) + min;
    // }
    //
    // this.setState({
    //   heartRate: this.state.heartRate + Math.round(addedHeartRate)
    // });
    if(this.state.heartRateIndex == this.state.heartRate.length) {
      this.state.heartRateIndex = -1;
    }
    this.setState({
      heartRateIndex: this.state.heartRateIndex + 1
    });
  }

  componentDidMount() {
    this.interval = setInterval(this.addCalories, 4500);
    this.interval = setInterval(this.addHeartRate, 3500);
    //this.interval = setInterval(this.resetCalories, 30000);
    //this.interval = setInterval(this.resetHeartRate, 30000);
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
      measurement = this.state.calories[this.state.calorieIndex];

    } else if (metric === HeartRate) {
      imageUrl = 'https://s3-us-west-1.amazonaws.com/cloudworkout/heart+emoji.png';
      measurement = this.state.heartRate[this.state.heartRateIndex];

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
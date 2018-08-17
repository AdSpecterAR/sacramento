import React, {Component}       from "react";
import Trend                    from 'react-trend'
import _ from "underscore";

export default class LineGraph extends Component {

  constructor(props) {
    super(props);

    let data = this.props.data;

    this.state = {
      data
    }

    this.addData = this.addData.bind(this);
  }

  //adds a random data point from 1 - 10, removes the first point
  addData(){
    let addedData = Math.round(Math.random() * 4 - 2);
    let data = _.clone(this.state.data);
    let length = data.length;
    data.push(data[length - 1] + addedData);
    data.splice(0, 1);

    this.setState({
      data: data
    })
  }

  componentDidMount() {
    this.interval = setInterval(this.addData, 250);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  markerEnd(){
    return (
        <marker id="dot" viewBox="0 0 10 10" refX="5" refY="5"
                markerWidth="5" markerHeight="5">
          <circle cx="4" cy="4" r="4" fill="white" />
        </marker>
    )
  }

  render(){

    return (
      <div ref="lineGraph"
           style={{position: 'absolute',
             bottom: '20px',
             left: '15%',
             zIndex: '1',
             width: '60%',
             // overflow: 'hidden'
             // maxHeight: '100px'
           }}>

        <svg>
          {this.markerEnd()}
        </svg>
        <Trend data={this.state.data}
               smooth
               strokeWidth={1.4}
               strokeOpacity={0.7}
               markerEnd="url(#dot)"
               gradient={[this.props.colour]}
          // height={100}
          // width={1500}
        >
        </Trend>
      </div>
    )
  }
}

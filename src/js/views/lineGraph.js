import React, {Component}       from "react";
import Trend                    from 'react-trend'

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
    let addedData = Math.round(Math.random() * 10);
    this.state.data.push(addedData);
    this.state.data.splice(0, 1);
    console.log(this.state.data);
  }

  componentDidMount() {
    this.interval = setInterval(this.addData, 500);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render(){
    console.log(this.refs.lineGraph)
    return (
      <div ref="lineGraph"
           style={{position: 'absolute',
             bottom: '20px',
             zIndex: '1',
             width: '100%',
             // overflow: 'hidden'
             // maxHeight: '100px'
           }}>
        <Trend data={this.state.data}
               autoDraw
               smooth
               strokeWidth={0.75}
               strokeOpacity={0.5}
               gradient={[this.props.colour]}
          // height={100}
          // width={1500}
        />
      </div>
    )
  }
}

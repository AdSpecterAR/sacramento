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
    let addedData = Math.round(Math.random() * 2 - 1);

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

  render(){
    console.log(this.refs.lineGraph)

    return (

      <div ref="lineGraph"
           style={{position: 'absolute',
             bottom: '20px',
             zIndex: '1',
             width: '75%',
             // overflow: 'hidden'
             // maxHeight: '100px'
           }}>
        <Trend data={this.state.data}
               autoDraw
               smooth
               strokeWidth={0.75}
               strokeOpacity={0.75}
               markerEnd= '<marker id="dot" viewBox="0 0 10 10" refX="5" refY="5"
                                                                         markerWidth="5" markerHeight="5">
        <circle cx="5" cy="5" r="5" fill="red" />
      </marker>'
               gradient={[this.props.colour]}
          // height={100}
          // width={1500}
        />
      </div>
    )
  }
}

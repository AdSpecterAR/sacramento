import React, { Component }     from 'react';
import CountUp                  from 'react-countup';
import ClockIcon                from '../../icons/clockIcon';
import ElectricalSensorIcon     from '../../icons/electricalSensorIcon';
import EngineeringIcon          from '../../icons/engineeringIcon';
import SalesPerformanceIcon     from '../../icons/salesPerformanceIcon';


export default class MetricsDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        <h2>Campaign performance this week</h2>

        <div className="row" style={{marginTop: '40px'}}>
          <div style={{display: 'inline-block', width: '23%'}} className="col-lg-3 col-md-6">
            <div className="card-box widget-user bg-info border-info">
              <div className="flexbox align-items-center justify-space-between">
                <div style={{width: '60px'}}>
                  <SalesPerformanceIcon />
                </div>

                <div className="text-align-right">
                  <h1>
                    $<CountUp start={0} end={89562} duration={1.5} />
                  </h1>

                  <h5>Total Revenue</h5>
                </div>
              </div>
            </div>
          </div>

          <div style={{display: 'inline-block', width: '23%'}} className="col-lg-3 col-md-6">
            <div className="card-box widget-user bg-danger border-danger">
              <div className="flexbox align-items-center justify-space-between">
                <div style={{width: '60px'}}>
                  <ClockIcon />
                </div>

                <div className="text-align-right">
                  <h1>
                    <CountUp start={0} end={6.91} decimals={2} duration={0.5} />
                  </h1>

                  <h5>
                    Secs per impression
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div style={{display: 'inline-block', width: '23%'}} className="col-lg-3 col-md-6">
            <div className="card-box widget-user bg-purple border-purple">
              <div className="flexbox align-items-center justify-space-between">
                <div style={{width: '60px'}}>
                  <EngineeringIcon />
                </div>

                <div className="text-align-right">
                  <h1>
                    <CountUp start={0} end={587} duration={1} />
                  </h1>

                  <h5>
                    App appearances
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div style={{display: 'inline-block', width: '23%'}} className="col-lg-3 col-md-6">
            <div className="card-box widget-user bg-custom border-custom">
              <div className="flexbox align-items-center justify-space-between">
                <div style={{width: '60px'}}>
                  <ElectricalSensorIcon />
                </div>

                <div className="text-align-right">
                  <h1>
                    <CountUp start={0} end={503988} duration={2} />
                  </h1>

                  <h5>
                    Impressions
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

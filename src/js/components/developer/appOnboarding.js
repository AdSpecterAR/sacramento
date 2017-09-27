import React, { Component }     from 'react';


export default class AppOnboarding extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        <h2>
          Monetize
        </h2>

        <div className="row">
          <div className="col-sm-6">
            <h4>
              Select an app
            </h4>

            <div className="card-box">
              <form className="form-horizontal" role="form">
                <div className="form-group">
                  <label className="col-md-2 control-label">Text</label>
                  <div className="col-md-10">
                    <input type="text" className="form-control" value="Some text value..." />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-2 control-label" for="example-email">Email</label>
                  <div className="col-md-10">
                    <input type="email" id="example-email" name="example-email" className="form-control" placeholder="Email" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-2 control-label">Password</label>
                  <div className="col-md-10">
                    <input type="password" className="form-control" value="password" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-md-2 control-label">Placeholder</label>
                  <div className="col-md-10">
                    <input type="text" className="form-control" placeholder="placeholder" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-2 control-label">Text area</label>
                  <div className="col-md-10">
                    <textarea className="form-control" rows="5"></textarea>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

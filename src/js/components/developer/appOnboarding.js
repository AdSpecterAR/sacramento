import React, { Component }     from 'react';


const styles = {
  timeline: {
    paddingLeft: '30px',
    borderLeft: '2px solid rgba(255, 255, 255, 0.1)'
  },
  timelineNumber: {
    position: 'absolute',
    top: '-5px',
    left: '-45px',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#1B95E0',
    textAlign: 'center',
    padding: '5px'
  }
};

export default class AppOnboarding extends Component {

  constructor(props) {
    super(props);

    let appRegistrationData = {
      name: '',
      platformValue: 0
    };

    let appFormatData = {
      type: 'image',
      adUnitName: ''
    };

    this.state = {
      appRegistrationData,
      appFormatData,
      shouldShowEditAppRegistration: true,
      shouldShowEditAppFormat: true,
      shouldShowEditAnalytics: true,
      shouldShowFinalInstructions: false
    };

    this.handleRegisterApp = this.handleRegisterApp.bind(this);
    this.handleSaveAppFormat = this.handleSaveAppFormat.bind(this);
    this.handleSetAnalytics = this.handleSetAnalytics.bind(this);
  }

  render() {
    return (
      <div>
        <h2 className="m-b-20">
          Monetize
        </h2>

        <div className="m-l-20">
          <div
            className="row p-b-25"
            style={styles.timeline}
          >
            <div className="col-sm-8">
              {this.renderTimelineNumber(1)}

              <h4 className="m-t-0">
                Register your app
              </h4>

              <p>
                This will generate an Ad unit ID for you to paste into your code.
              </p>

              {this.state.shouldShowEditAppRegistration
                ? this.renderEditAppRegistration()
                : this.renderAppRegistration()
              }
            </div>
          </div>

          <div
            className="row p-b-25"
            style={styles.timeline}
          >
            <div className="col-sm-8">
              {this.renderTimelineNumber(2)}

              <h4 className="m-t-0">
                Select ad format
              </h4>

              {this.state.shouldShowEditAppFormat
                ? this.renderEditAdFormat()
                : this.renderAdFormat()
              }
            </div>
          </div>

          <div
            className="row p-b-25"
            style={styles.timeline}
          >
            <div className="col-sm-8">
              {this.renderTimelineNumber(3)}

              <h4 className="m-t-0">
                Set up analytics (optional)
              </h4>

              <div className="card-box">
                <p>
                  Link your account to our free analytics tool to improve
                  app monetization and user engagement
                </p>

                <form
                  className="form-horizontal m-t-20"
                  role="form"
                >
                  <div class="form-group m-l-10">
                    {this.state.shouldShowEditAnalytics
                      ? this.renderEditAnalytics()
                      : this.renderAnalyticsSelection()
                    }
                  </div>
                </form>
              </div>
            </div>
          </div>

          {this.state.shouldShowFinalInstructions && (
            <div
              className="row p-b-25"
              style={styles.timeline}
            >
              <div className="col-sm-8">
                {this.renderTimelineNumber(4)}

                <h4 className="m-t-0">
                  In-app integration instructions
                </h4>

                <div>
                  <p>
                    1. Download the

                    <a href="/" className="text-link"> AdSpecter Mobile SDK</a>.
                  </p>

                  <p>
                    2. Follow the

                    <a href="/" className="text-link"> SDK integration guide</a>.

                    Specify ad size, type, and placement when you integrate the code.
                  </p>

                  <div className="m-l-20">
                    <p><b>App ID: </b>eee124811e7ea1182ecd56b11c8a3778</p>
                    <p><b>Ad unit ID: </b>049f0f2d6ba0f24e5deb7a718c9dae8c</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div style={{marginBottom: '100px'}}></div>
        </div>
      </div>
    );
  }

  renderTimelineNumber(number) {
    return (
      <b style={styles.timelineNumber}>
        {number}
      </b>
    );
  }

  renderAppRegistration() {
    return (
      <div className="m-t-25 m-l-15">
        <h5>
          My App Name
        </h5>

        <p>
          Platform: iOS
        </p>

        <p className="m-t-15">
          <b>Ad unit ID: </b>

          <span>049f0f2d6ba0f24e5deb7a718c9dae8c</span>
        </p>
      </div>
    );
  }

  renderEditAppRegistration() {
    return (
      <div>
        <div className="card-box">
          <form
            className="form-horizontal m-t-20"
            role="form"
          >
            <div className="form-group">
              <label className="col-md-3 control-label">
                App name
              </label>

              <div className="col-md-9">
                <input
                  type="email"
                  id="appName"
                  name="appName"
                  className="form-control"
                  placeholder="e.g. My App Name"
                />
              </div>
            </div>

            <div className="form-group">
              <label
                className="col-md-3 control-label"
                for="platform"
              >
                Platform
              </label>

              <div className="col-sm-3">
                <select className="form-control">
                  <option>iOS</option>
                  <option>Android</option>
                  <option>Both</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        <div className="m-t-25">
          <button
            onClick={this.handleRegisterApp}
            type="button"
            className="btn btn-primary waves-effect w-md waves-light m-b-5 m-r-10"
          >
            Add app
          </button>

          <button
            type="button"
            className="btn btn-default waves-effect w-md waves-light m-b-5"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  renderEditAdFormat() {
    return (
      <div>
        <div className="card-box">
          <form
            className="form-horizontal m-t-20"
            role="form"
          >
            <div class="form-group m-l-10">
              <label className="col-md-3 control-label">
                Ad type
              </label>

              <div className="col-md-9" style={{marginTop: '7px'}}>
                <div class="checkbox checkbox-primary">
                  <input
                    id="checkbox0"
                    type="checkbox"
                    className="m-r-10"
                  />

                  <label for="checkbox0">
                    Text
                  </label>
                </div>

                <div class="checkbox checkbox-primary">
                  <input
                    id="checkbox1"
                    type="checkbox"
                    className="m-r-10"
                  />

                  <label for="checkbox1">
                    Image
                  </label>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label
                className="col-md-3 control-label"
                for="adUnitName"
              >
                Ad unit name
              </label>

              <div className="col-md-9">
                <input
                  id="adUnitName"
                  name="adUnitName"
                  className="form-control"
                  placeholder="e.g. Ad 1"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="m-t-25">
          <button
            onClick={this.handleSaveAppFormat}
            type="button"
            className="btn btn-primary waves-effect w-md waves-light m-b-5 m-r-10"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  renderAdFormat() {
    return (
      <div className="m-t-25 m-l-15">
        <p>
          Ad type: Image
        </p>

        <p>
          Ad unit name: image ad 1
        </p>
      </div>
    );
  }

  renderEditAnalytics() {
    return (
      <div>
        <div class="checkbox checkbox-primary">
          <input
            id="checkbox1"
            type="checkbox"
            className="m-r-10"
          />

          <label for="checkbox1">
            Enable analytics
          </label>
        </div>

        <div className="m-t-25">
          <button
            onClick={this.handleSetAnalytics}
            type="button"
            className="btn btn-primary waves-effect w-md waves-light m-b-5 m-r-10"
          >
            Enable
          </button>
        </div>
      </div>
    );
  }


  renderAnalyticsSelection() {
    return (
      <div className="m-t-25">
        <i className="fa fa-check" />

        <b className="m-l-10">
          Analytics enabled!
        </b>
      </div>
    );
  }

  handleRegisterApp() {
    this.setState({
      shouldShowEditAppRegistration: false
    });
  }

  handleSaveAppFormat() {
    this.setState({
      shouldShowEditAppFormat: false
    });
  }

  handleSetAnalytics() {
    this.setState({
      shouldShowEditAnalytics: false,
      shouldShowFinalInstructions: true
    });
  }
}

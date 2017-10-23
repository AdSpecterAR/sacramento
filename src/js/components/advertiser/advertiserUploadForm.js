import React, { Component }     from 'react';
import Dropzone                 from 'react-dropzone';
import Modal                    from '../../services/modal';
import Toast                    from '../../../icons/toast';


export default class AdvertiserUploadForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      files: [],
      shouldShowToast: false
    };

    this.onFileDrop = this.onFileDrop.bind(this);
    this.onSubmitFiles = this.onSubmitFiles.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  render() {
    return (
      <div>
        <h2>
          Start a new campaign
        </h2>

        <div className="row m-t-25">
          <div className="col-sm-8 card-box">
            <form className="form-horizontal m-t-20">
              <div className="form-group">
                <label className="col-md-3 control-label">
                  Campaign Name
                </label>

                <div className="col-md-9">
                  <input
                    id="campaignName"
                    name="campaignName"
                    className="form-control"
                    placeholder="e.g. My Campaign Name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-3 control-label">
                  Campaign Text
                </label>

                <div className="col-md-9">
                  <input
                    id="campaignText"
                    name="campaignText"
                    className="form-control"
                    placeholder="Max 50 characters"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-3 control-label">
                  Link
                </label>

                <div className="col-md-9">
                  <input
                    id="campaignLink"
                    name="campaignLink"
                    className="form-control"
                    placeholder="e.g. www.adspecter.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-3 control-label">
                  Campaign Duration
                </label>

                <div className="col-md-2">
                  <input
                    id="campaignDuration"
                    name="campaignDuration"
                    className="form-control"
                    placeholder="e.g. 7"
                  />
                </div>

                <div style={{display: 'inline-block', marginTop: '8px'}}>
                  days
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="row m-t-25">
          <div className="col-sm-8">
            <h2 className="page-title">
              Upload the images for this campaign
            </h2>

            <section className="m-t-25">
              <div className="dropzone">
                <Dropzone
                  className="text-align-center"
                  onDrop={this.onFileDrop}
                  style={{
                    border: '2px dashed white',
                    borderRadius: '5px',
                    width: '100%',
                    height: '300px',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <div style={{alignSelf: 'center'}}>
                    <i className="fa fa-cloud-upload" />

                    <p className="m-t-15">
                      Try dropping some files here, or click to select files to upload.
                    </p>

                    <div className="m-t-25 m-b-25">
                      or
                    </div>

                    <button
                      type="button"
                      className="btn btn-custom waves-effect waves-light w-md m-b-5"
                    >
                      Browse files
                    </button>
                  </div>
                </Dropzone>
              </div>

              <aside className="m-t-25">
                {this.state.files.length > 0 ? (
                  <h5>
                    Uploaded files
                  </h5>
                ) : null}

                <ul>
                  {this.renderUploadedFiles()}
                </ul>
              </aside>

              <button
                onClick={this.onSubmitFiles}
                type="button"
                style={{margin: '100px 0'}}
                className="btn btn-custom waves-effect waves-light w-md"
              >
                Create campaign
              </button>
            </section>
          </div>
        </div>

        <Modal
          showModal={this.state.shouldShowToast}
          showCloseButton={true}
          onCloseCallback={this.onCloseModal}
        >
          <div
            className="card-box white"
            style={{minHeight: '400px'}}
          >
            <Toast onClickToastButton={this.onCloseModal} />
          </div>
        </Modal>
      </div>
    );
  }


  //================
  // RENDER METHODS
  //================


  renderUploadedFiles() {
    return this.state.files.map((file) => {
      if (file.type === 'image/png') {
        return (
          <li
            key={file.name}
            className="adjacent m-r-20 m-b-20"
          >
            <img
              src={file.preview}
              style={{maxWidth: '250px'}}
              alt=""
            />
          </li>
        );
      } else {
        return (
          <li key={file.name}>
            {file.name} - {file.size} bytes
          </li>
        );
      }
    });
  }


  //================
  // EVENT HANDLERS
  //================


  onFileDrop(files) {
    this.setState({
      files
    });
  }

  onSubmitFiles() {
    this.setState({
      shouldShowToast: true
    });
  }

  onCloseModal() {
    this.setState({
      shouldShowToast: false
    });
  }
}
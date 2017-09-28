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
        <div className="row">
          <div className="col-sm-12">
            <div className="btn-group pull-right m-t-5 m-b-20">
              <button
                type="button"
                className="btn btn-info dropdown-toggle waves-effect waves-light"
              >
                Settings

                <span className="m-l-5">
                  <i className="fa fa-cog" />
                </span>
              </button>
            </div>

            <h2 className="page-title">
              Upload the images for this campaign
            </h2>
          </div>
        </div>

        <section className="m-t-25">
          <div className="dropzone">
            <Dropzone
              className="text-align-center"
              onDrop={this.onFileDrop}
              style={{
                border: '2px dashed white',
                borderRadius: '5px',
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
            <h3>
              Uploaded files
            </h3>

            <ul>
              {this.renderUploadedFiles()}
            </ul>
          </aside>

          <button
            onClick={this.onSubmitFiles}
            type="button"
            className="btn btn-custom waves-effect waves-light w-md m-b-5"
          >
            Submit files
          </button>
        </section>

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
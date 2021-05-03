import React, { PureComponent } from 'react';
import Table from '../../components/Table/Table';
import InputFile from '../../components/Input/InputFile';
import Toast from '../../components/Toast/Toast';
import HomeService from './HomeService';
import idSample from '../../assets/images/id-sample.jpg';

class IdTab extends PureComponent {
  state = {
    textData: {},
    params: {
      page: 0
    },
    file: null,
    fileName: '',
    fileUrl: '',
    uploading: false,
    uploaded: false,
    uploadSuccess: false
  };

  columns = [
    {
      Header: 'Thuộc tính',
      accessor: 'attribute',
      maxWidth: 120,
      sortable: false
    },
    {
      Header: 'Giá trị',
      accessor: 'value',
      sortable: false
    }
  ];

  fileTypes = ['.jpg', '.png'];
  uploadFile = (file) => {
    if (file) {
      let extension = '.' + file.name.split('.').pop().toLowerCase();
      if (extension && this.fileTypes.indexOf(extension) !== -1) {
        this.setState({
          fileName: file.name,
          uploading: true,
          uploaded: false,
          uploadSuccess: false
        });
        let formData = new FormData();
        formData.append('img', file);
        HomeService.uploadFile(
          formData,
          (res) => {
            this.setState({
              file,
              textData: this.convertJson(res),
              // textData: this.convertJson(SAMPLE_RESPONSE_1),
              uploading: false,
              uploaded: true,
              uploadSuccess: true
            });
          },
          (err) => {
            Toast.error(err);
            this.setState({
              uploading: false,
              uploaded: true,
              uploadSuccess: false
            });
          }
        );
      } else {
        Toast.error(
          'Invalid file, please upload ' + this.fileTypes.join(',') + ' files only'
        );
      }
    }
  };

  render() {
    const { textData, fileName, uploading, uploaded, uploadSuccess } = this.state;
    return (
      <div className="docs-tab-wrapper">
        <div className="input-section">
          <h4>Upload your own file</h4>
          <InputFile
            onChange={this.uploadFile}
            types={this.fileTypes}
            placeHolder="Please upload an ID photo..."
            fileName={fileName}
            uploading={uploading}
            uploaded={uploaded}
            uploadSuccess={uploadSuccess}
          />
          <h4>Sample ID photo</h4>
          <div className="sample-file-wrapper">
            <div className="sample-file-item">
              <img className="sample-file-image" src={idSample} alt="id sample" />
            </div>
          </div>
        </div>
        <div className="output-section">
          <h4>Result</h4>
          <div className="output-text">
            <Table
              columns={this.columns}
              data={textData}
              className="text-table"
              defaultPageSize={5}
              showPagination={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default IdTab;

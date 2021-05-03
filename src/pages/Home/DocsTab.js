import React, { PureComponent } from 'react';
import Table from '../../components/Table/Table';
import InputFile from '../../components/Input/InputFile';
import Toast from '../../components/Toast/Toast';
import RadioButton from '../../components/Input/RadioButton';
// import { Document, Page } from 'react-pdf/dist/umd/entry.webpack';
import { COLUMN_MAPPING, SAMPLE_RESPONSE_1, SAMPLE_RESPONSE_2 } from './HomeConstant';
import HomeService from './HomeService';
import docsSample1 from '../../assets/images/docs-sample-1.png';
import docsSample2 from '../../assets/images/docs-sample-2.png';
import './Home.scss';
// import 'react-pdf/dist/umd/Page/AnnotationLayer.css';

const SECRET_DOC = 'Đây là văn bản mật, KHÔNG được phép trích xuất!';
const DOCS_SAMPLE_1 = 'DOCS_SAMPLE_1';
const DOCS_SAMPLE_2 = 'DOCS_SAMPLE_2';

class DocsTab extends PureComponent {
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
    uploadSuccess: false,
    docsSampleSuccess: false,
    numPages: null,
    docsSample: null,
    fakeLoading: false
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
      sortable: false,
      getProps: (state, rowInfo, column) => {
        const value = rowInfo ? rowInfo.original.value : null;
        let color;
        switch (value) {
          case SECRET_DOC:
            color = '#dc3545';
            break;
          default:
            color = null;
            break;
        }

        return {
          style: {
            color: color,
            fontWeight: color ? 'bold' : null
          }
        };
      }
    }
  ];

  convertJson = (json) => {
    const res = {};
    let list = [];
    let isSecret = false;

    for (let key in json) {
      let value = json[key];

      if (key === 'stamp' && value === true) {
        isSecret = true;
        break;
      }

      if (Array.isArray(value)) {
        list.push({
          attribute: COLUMN_MAPPING[key],
          value: value.join(', ')
        });
      } else {
        list.push({
          attribute: COLUMN_MAPPING[key],
          value
        });
      }
    }

    if (isSecret) {
      list = [];
      list.push({
        attribute: 'Tuyệt mật',
        value: SECRET_DOC
      });
    }

    res.list = list;
    res.totalPages = 1;
    return res;
  };

  fileTypes = ['.jpg', '.png', '.pdf'];
  uploadFile = (file) => {
    if (file) {
      let extension = '.' + file.name.split('.').pop().toLowerCase();
      if (extension && this.fileTypes.indexOf(extension) !== -1) {
        this.setState({
          fileName: file.name,
          uploading: true,
          uploaded: false,
          uploadSuccess: false,
          docsSampleSuccess: false,
          docsSample: null
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

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  onChangeDocsSample = (name, value) => {
    this.setState({
      docsSampleSuccess: false,
      fakeLoading: true,
      docsSample: value
    });

    // returns a random integer from 100 to 200
    const randomFakeLoading = this.getRndInteger(100, 200);
    setTimeout(() => {
      let textData = '';
      if (value === DOCS_SAMPLE_1) {
        textData = this.convertJson(SAMPLE_RESPONSE_1);
      } else if (value === DOCS_SAMPLE_2) {
        textData = this.convertJson(SAMPLE_RESPONSE_2);
      }

      this.setState({
        docsSampleSuccess: true,
        fakeLoading: false,
        textData
      });
    }, randomFakeLoading);
  };

  render() {
    const {
      textData,
      // file,
      fileName,
      uploading,
      uploaded,
      uploadSuccess,
      docsSampleSuccess,
      docsSample,
      fakeLoading
    } = this.state;
    return (
      <div className="docs-tab-wrapper">
        <div className="input-section">
          <h4>Upload your own file</h4>
          <InputFile
            onChange={this.uploadFile}
            types={this.fileTypes}
            placeHolder="Please upload a docs file..."
            fileName={fileName}
            uploading={uploading}
            uploaded={uploaded}
            uploadSuccess={uploadSuccess}
          />
          <h4>Or using our sample file</h4>
          <div className="sample-file-wrapper">
            <div className="sample-file-item">
              <img className="sample-file-image" src={docsSample1} alt="docs-sample-1" />
              <RadioButton
                label="Docs sample 1"
                labelClassName="blue-color"
                name="docsSample"
                value={DOCS_SAMPLE_1}
                onChange={this.onChangeDocsSample}
                checked={docsSample === DOCS_SAMPLE_1}
                disabled={fakeLoading}
              />
            </div>
            <div className="sample-file-item">
              <img className="sample-file-image" src={docsSample2} alt="docs-sample-2" />
              <RadioButton
                label="Docs sample 2"
                labelClassName="blue-color"
                name="docsSample"
                value={DOCS_SAMPLE_2}
                onChange={this.onChangeDocsSample}
                checked={docsSample === DOCS_SAMPLE_2}
                disabled={fakeLoading}
              />
            </div>
          </div>
        </div>
        {fakeLoading && (
          <div className="loading-section">
            <span className="uploading">
              <span className="uploading-icon"></span>Processing, please wait...
            </span>
          </div>
        )}
        {(uploadSuccess || docsSampleSuccess) && (
          <div className="output-section">
            <h4>Result</h4>
            {/* Ref: https://github.com/wojtekmaj/react-pdf/blob/master/sample/webpack/Sample.jsx */}
            {/* <div className="output-file">
                  <Document
                    file={file}
                    onLoadSuccess={this.onDocumentLoadSuccess}
                    options={{
                      cMapUrl: 'cmaps/',
                      cMapPacked: true
                    }}
                  >
                    {Array.from(new Array(numPages), (el, index) => (
                      <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                  </Document>
                </div> */}
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
        )}
      </div>
    );
  }
}

export default DocsTab;

import React, { PureComponent } from 'react';
import Table from '../../components/Table/Table';
import InputFile from '../../components/Input/InputFile';
import Toast from '../../components/Toast/Toast';
import { Document, Page } from 'react-pdf/dist/umd/entry.webpack';
import 'react-pdf/dist/umd/Page/AnnotationLayer.css';
import HomeService from './HomeService';
import './Home.scss';

class Home extends PureComponent {
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
    numPages: null
  };

  columns = [
    {
      Header: 'Thuộc tính',
      accessor: 'attribute',
      maxWidth: 120
    },
    {
      Header: 'Giá trị',
      accessor: 'value'
    }
  ];

  columnMapping = {
    date: 'Ngày',
    header: 'Tiêu đề',
    number: 'Số văn bản',
    quote: 'Trích yếu',
    send: 'Nơi gửi',
    sign: 'Chữ ký',
    type_doc: 'Kiểu văn bản'
  };

  jsonDemo = {
    date: ['Hà Nội, ngày 19 tháng 6 năm 2020'],
    header: [],
    number: ['Số 197/BC-TM'],
    quote: [],
    send: ['BỘ TƯ LỆNH CẢNH SÁT BIẾN', 'ĐOÀN CÔNG TÁC'],
    sign: []
  };

  convertJson = (json) => {
    const res = {};
    let list = [];

    for (let key in json) {
      let value = json[key];

      if (Array.isArray(value)) {
        list.push({
          attribute: this.columnMapping[key],
          value: value.join(', ')
        });
      } else {
        list.push({
          attribute: this.columnMapping[key],
          value
        });
      }
    }
    res.list = list;
    res.totalPages = 1;
    return res;
  };

  fileTypes = ['.jpg', '.pdf'];
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
        formData.append('file', file);
        HomeService.uploadFile(
          formData,
          (res) => {
            this.setState({
              file,
              textData: this.convertJson(res),
              // textData: this.convertJson(this.jsonDemo),
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

  render() {
    const {
      textData,
      file,
      fileName,
      uploading,
      uploaded,
      uploadSuccess,
      numPages
    } = this.state;
    return (
      <div className="section-wrapper">
        <div className="header-section">
          <div className="products-details">
            <h3 className="section-title">OCR - General Document</h3>
            <p>
              Converting PDF to text. Currently we support Vietnamese and English. This is
              the general model so that we could customize it so that it could work better
              on some specific document
            </p>
            <div className="availability">
              published by <span>Tuzaku</span>
            </div>
            <span className="computer-vision">Computer Vision</span>
            <div className="shape-wrapper">
              <div className="shape3">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOC41NjIiIGhlaWdodD0iMjguNTk0Ij48Y2lyY2xlIGN4PSIxNC4yODEiIGN5PSIxNC4yOTciIHI9IjEyLjc4MSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTFlMWUxIiBzdHJva2Utd2lkdGg9IjMiLz48L3N2Zz4="
                  alt="shape"
                />
              </div>
              <div className="shape4">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSI1MCUiIHkxPSIxMDAlIiB4Mj0iNTAlIiB5Mj0iLTQ5Ljg5MSUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjMDBFOTJCIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iI0NDRkZBOCIgb2Zmc2V0PSIxMDAlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggdHJhbnNmb3JtPSJyb3RhdGUoMTMyIDgxLjYyNyAxNjYuMTY0KSIgZD0iTTIgMzIzbDEwLjU5OCAxM0wyMyAzMjN6IiBzdHJva2U9InVybCgjYSkiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIgb3BhY2l0eT0iLjY1OSIvPjwvc3ZnPg=="
                  alt="shape"
                />
              </div>
              <div className="shape5">
                <img
                  src="data:image/png;base64,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"
                  alt="shape"
                />
              </div>
              <div className="shape6 rotateme">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSI1MCUiIHkxPSIxMDAlIiB4Mj0iNTAlIiB5Mj0iLTQ5Ljg5MSUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjMDBFOTJCIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iI0NDRkZBOCIgb2Zmc2V0PSIxMDAlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggdHJhbnNmb3JtPSJyb3RhdGUoMTMyIDgxLjYyNyAxNjYuMTY0KSIgZD0iTTIgMzIzbDEwLjU5OCAxM0wyMyAzMjN6IiBzdHJva2U9InVybCgjYSkiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIgb3BhY2l0eT0iLjY1OSIvPjwvc3ZnPg=="
                  alt="shape"
                />
              </div>
              <div className="shape7">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSI1MCUiIHkxPSIxMDAlIiB4Mj0iNTAlIiB5Mj0iLTQ5Ljg5MSUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjMDBFOTJCIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iI0NDRkZBOCIgb2Zmc2V0PSIxMDAlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggdHJhbnNmb3JtPSJyb3RhdGUoMTMyIDgxLjYyNyAxNjYuMTY0KSIgZD0iTTIgMzIzbDEwLjU5OCAxM0wyMyAzMjN6IiBzdHJva2U9InVybCgjYSkiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIgb3BhY2l0eT0iLjY1OSIvPjwvc3ZnPg=="
                  alt="shape"
                />
              </div>
              <div className="shape8 rotateme">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiI+PHRleHQgZGF0YS1uYW1lPSIrIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjQzNyAxLjQzNCAtMS40MzcgMS40MzQgLS44MzIgMjMuMDY2KSIgZm9udC1zaXplPSIyNSIgZmlsbD0iIzI3ZWFjOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IlJvYm90byI+PHRzcGFuIHg9IjAiPis8L3RzcGFuPjwvdGV4dD48L3N2Zz4="
                  alt="shape"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="main-section">
          <div className="main-section-wrapper">
            <div className="input-section">
              <h3 className="section-title">TRY OUR DEMO</h3>
              <InputFile
                onChange={this.uploadFile}
                types={this.fileTypes}
                fileName={fileName}
                uploading={uploading}
                uploaded={uploaded}
                uploadSuccess={uploadSuccess}
              />
            </div>
            {uploadSuccess && (
              <div className="output-section">
                <div className="output-file">
                  {/* Ref: https://github.com/wojtekmaj/react-pdf/blob/master/sample/webpack/Sample.jsx */}
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
                </div>
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
        </div>
      </div>
    );
  }
}

export default Home;

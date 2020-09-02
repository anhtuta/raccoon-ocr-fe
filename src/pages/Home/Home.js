import React, { PureComponent } from 'react';
import Table from '../../components/Table/Table';
import InputFile from '../../components/Input/InputFile';
import Toast from '../../components/Toast/Toast';
import { BAST_URL } from '../../service/axiosClient';
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
      Header: 'Text',
      accessor: 'text'
    }
  ];

  jsonDemo = {
    list: [
      {
        text: 'ngày 01 tháng 10 năm 2018'
      },
      {
        text: 'V/v cử cán bộ tham gia tập huấn nghiệp vụ CNTT năm 2018'
      },
      {
        text: 'a1'
      },
      {
        text: ': 101/TM-CNTT'
      },
      {
        text: 'BỘ TƯ LỆNH CẢNH SÁT BIỂN BỘ THAM MƯU BỘ TƯ LỆNH CẢNH SÁT BIỂN BỘ THAM MƯU'
      },
      {
        text: 'THƯ MỜI - CÔNG VĂN'
      },
      {
        text: 'This is a demo'
      },
      {
        text: 'Korea  rka jgabjaj rb aew awr rea'
      },
      {
        text: 'Korea  rka jgabjaj rb aew awr rea'
      },
      {
        text: 'Korea  rka jgabjaj rb aew awr rea'
      },
      {
        text: 'Korea  rka jgabjaj rb aew awr rea'
      },
      {
        text: 'Korea  rka jgabjaj rb aew awr rea'
      },
      {
        text: 'Korea  rka jgabjaj rb aew awr rea'
      }
    ],
    totalPages: 1
  };
  fileTypes = ['.jpg', '.pdf'];
  uploadFile = (file) => {
    if (file) {
      let extension = '.' + file.name.split('.').pop().toLowerCase();
      if (extension && this.fileTypes.indexOf(extension) != -1) {
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
            console.log('fileUrl: ', BAST_URL + '/api/file?name=' + res.data.fileName);
            this.setState({
              file,
              textData: this.jsonDemo,
              fileUrl: BAST_URL + '/api/file?name=' + res.data.fileName,
              uploading: false,
              uploaded: true,
              uploadSuccess: true
            });
          },
          (err) => {
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

  onFetchData = () => {};

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
            {/* <button className="btn btn-primary d-block my-4">TRY DEMO</button> */}
          </div>
        </div>
        <div className="main-section">
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
                  onFetchData={this.onFetchData}
                  className="text-table"
                  defaultPageSize={5}
                  showPagination={false}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;

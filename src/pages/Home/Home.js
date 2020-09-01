import React, { PureComponent } from 'react';
import Table from '../../components/Table/Table';
import HomeService from './HomeService';
import './Home.scss';
import InputFile from '../../components/Input/InputFile';

class Home extends PureComponent {
  state = {
    textData: {},
    params: {
      page: 0
    },
    fileName: '',
    uploading: false,
    uploaded: false,
    uploadSuccess: false
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
    this.setState({
      fileName: file.name,
      uploading: true,
      uploaded: false,
      uploadSuccess: false
    });
    let formData = new FormData();
    formData.append('file', file);
    HomeService.uploadFile(formData)
      .then((res) => {
        this.setState({
          textData: this.jsonDemo,
          uploading: false,
          uploaded: true,
          uploadSuccess: true
        });
      })
      .catch((err) => {
        this.setState({
          uploading: false,
          uploaded: true,
          uploadSuccess: false
        });
      });
  };

  onFetchData = () => {};

  render() {
    const {
      textData,
      loading,
      fileName,
      uploading,
      uploaded,
      uploadSuccess
    } = this.state;
    return (
      <div className="section-wrapper">
        <div className="header-section">
          <div className="col-lg-7">
            <div className="products-details">
              <h3 className="section-title">OCR - General Document</h3>
              <p>
                Converting images and PDF to text. Currently we support Vietnamese,
                English and Japanese. This is the general model so that we could customize
                it so that it could work better on some specific document
              </p>
              <div className="availability">
                published by <span>Tuzaku</span>
              </div>
              <span className="computer-vision">Computer Vision</span>
              <button className="btn btn-primary d-block my-4">TRY DEMO</button>
            </div>
          </div>
        </div>
        <div className="main-section">
          <div className="input-section">
            <h3 className="section-title">TRY OUR DEMO</h3>
            <InputFile
              onChange={this.uploadFile}
              fileName={fileName}
              types={this.fileTypes}
              label="Upload file"
              isRequire={true}
              uploading={uploading}
              uploaded={uploaded}
              uploadSuccess={uploadSuccess}
            />
          </div>
          <div className="output-section">
            <Table
              columns={this.columns}
              data={textData}
              // loading={loading}
              onFetchData={this.onFetchData}
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

export default Home;

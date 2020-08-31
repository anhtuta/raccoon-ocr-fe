import React, { PureComponent } from 'react';
import { Input } from 'reactstrap';
import Table from '../../components/Table/Table';
import HomeService from './HomeService';
import './Home.scss';

class Home extends PureComponent {
  state = {
    textData: {},
    params: {
      page: 0
    }
  };

  columns = [
    {
      Header: 'Text',
      accessor: 'text'
    }
  ];

  uploadFile = (params) => {
    this.setState({ loading: true });
    const newParams = { ...this.state.params, ...params };
    this.setState({
      params: newParams
    });
    const json = HomeService.uploadFileDemo();
    this.setState({
      textData: json
    });
  };

  render() {
    const { textData, loading } = this.state;
    return (
      <div className="section-wrapper">
        <div className="header-section">
          <div className="col-lg-7">
            <div className="products-details">
              <h3>OCR - General Document</h3>
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
            <h3>TRY OUR DEMO</h3>
            <Input type="file" name="file" id="exampleFile" />
          </div>
          <div className="output-section">
            <Table
              columns={this.columns}
              data={textData}
              // loading={loading}
              onFetchData={this.uploadFile}
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

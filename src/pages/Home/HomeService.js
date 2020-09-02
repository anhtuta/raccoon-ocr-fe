import axiosClient from '../../service/axiosClient';

const uploadFile = (data, successCallback, failCallback) => {
  axiosClient
    .post('/api/file/upload', data)
    .then((res) => {
      successCallback(res);
    })
    .catch((err) => {
      failCallback(err);
    });
};

export default {
  uploadFile
};

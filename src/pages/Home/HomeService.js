import axiosClient from '../../service/axiosClient';

const uploadFile = (data, successCallback, failCallback) => {
  axiosClient
    .post('/process', data)
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

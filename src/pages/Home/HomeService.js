import axiosClient from '../../service/axiosClient';

const uploadFile = (data) => {
  return axiosClient.post('/api/upload/file', data);
};

export default {
  uploadFile
};

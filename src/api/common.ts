import axios from 'axios';
import { API_URL, API_VERSION, auth_local_storage_accessToken } from '../utils/const';
import { Subject } from '../utils/observer';

const commonAPI = axios.create({
  baseURL: `${API_URL}${API_VERSION}`,
  headers: {
    authorization: `Bearer ${auth_local_storage_accessToken}`,
  },
});

// Create a cancellation token source
const cancelTokenSource = axios.CancelToken.source();

// Add cancellation token to the Axios instance defaults
commonAPI.defaults.cancelToken = cancelTokenSource.token;

export default commonAPI;

export const globalCallDetail = {
  onOutGoingCall: new Subject<any>(),
};

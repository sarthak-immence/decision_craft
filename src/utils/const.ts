// eslint-disable-next-line import/no-cycle
import { getCookie } from './helper';

export const WEBSITE_URL = 'https://azle.io/';
export const WEBSITE_LOGIN_ENDPOINT = '';
export const API_URL = 'https://api.azle.io/';
export const API_VERSION = 'v1';
export const API_ENDPOINT_FB_WEBHOOK = `${API_URL}${API_VERSION}/messenger/receive`;
const getUserDataFromCookie: any = getCookie('userData');
const userData: any = getUserDataFromCookie?.split('}')[0];
const JsonUserData: any = typeof userData === 'string' ? JSON.parse(`${userData}}`) : userData;
const accessToken: any = JsonUserData?.token;
export const auth_local_storage_accessToken = accessToken;
export const FB_APP_secret = '1cc4d2236cc3c53908a0613b905a8f37';

// pagination.
export const defaultPaginationChat = {
  currentPage: 1,
  pageLimit: 20,
  totalPages: 1,
};
export const defaultPaginationInboxDetail = {
  currentPage: 1,
  pageLimit: 20,
  totalPages: 1,
};

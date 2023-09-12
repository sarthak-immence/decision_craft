/* eslint-disable no-nested-ternary */
import moment from 'moment';
// eslint-disable-next-line import/no-cycle
import { API_URL } from './const';

// cookie
export const setCookie = (name: any, value: any, days?: any, expDate?: any) => {
  let domain;
  let date;
  let expires;
  let host;
  const path = 'path=/;';

  if (expDate) {
    expires = `expires=${expDate.toUTCString()};`;
  } else if (days) {
    date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `expires=${date.toUTCString()};`;
  } else {
    expires = '';
  }

  // eslint-disable-next-line prefer-const, prefer-destructuring, no-restricted-globals
  host = location.host;
  if (host.split('.').length === 1) {
    // no "." in a domain - it's localhost or something similar
    document.cookie = `${name}=${value};${expires}${path}`;
    // eslint-disable-next-line eqeqeq
  } else if (getCookie(name) == null || getCookie(name) != value) {
    // append "." to current domain
    domain = `.${host?.split(':')?.[0]}`;
    document.cookie = `${name}=${value}${expires}${path}domain=${domain};`;
  }
};

export const getCookie = (name: any) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    // eslint-disable-next-line eqeqeq
    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length);
    }

    // eslint-disable-next-line eqeqeq
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const eraseCookie = (name: any) => {
  const path = 'path=/;';
  const date = new Date();
  date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()};`;
  // eslint-disable-next-line no-restricted-globals
  const { host } = location;
  const domainList = host.split(':')[0].split('.');
  domainList.shift();
  const domain = domainList.join('.');
  document.cookie = `${name}=${''};${expires}${path}domain=.${domain};`;
};

export const deleteAllCookies = () => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
};

// date
export const utcToLocal = (value: Date | string | undefined): Date | null => {
  if (value) {
    if (!(value instanceof Date) && typeof value == 'string') {
      value = value.replace(/[zZ]$/, '');
    }
    if (!Number.isNaN(new Date(value).getTime())) {
      return new Date(`${value.toString()}Z`);
    }
  }
  return null;
};

export const formatDate = (value: Date | null): string => {
  if (!value) {
    return '';
  }
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const date = value.getDate().toString().padStart(2, '0');
  const month = months[value.getMonth()];
  const year = value.getFullYear();
  let hours = value.getHours();
  const minutes = value.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours == 0 ? 12 : hours; // the hour '0' should be '12'
  const strTime = `${hours}:${minutes} ${ampm}`;
  return `${date}-${month}-${year} ${strTime}`;
};

export const getDaysFromToday = (value: Date | string | null, type: string) => {
  if (!value) {
    return '';
  }

  const ends = moment();

  const duration: any = moment.duration(ends.diff(value));
  const data: any = duration && duration._data;

  switch (type) {
    case 'without-time':
      return `${
        data.years !== 1 && data.years !== 0
          ? `${data.years} years`
          : data.years === 1
          ? `${data.years} year`
          : ''
      } ${
        data.months !== 1 && data.months !== 0
          ? `${data.months} months`
          : data.months === 1
          ? `${data.months} month`
          : ''
      } ${
        data.days !== 1 && data.days !== 0
          ? `${data.days} days`
          : data.days === 1
          ? `${data.days} day`
          : ''
      } ${
        data.days === 0 && data.hours !== 1 && data.hours !== 0
          ? `${data.hours} hours`
          : data.hours === 1
          ? `${data.hours} hour`
          : ''
      } ${
        data.hours === 0 && data.minutes !== 1 && data.minutes !== 0
          ? `${data.minutes} minutes`
          : data.minutes === 1
          ? `${data.minutes} minute`
          : ''
      } ${
        data.minutes === 0 && data.seconds !== 1 && data.seconds !== 0
          ? `${data.seconds} seconds`
          : data.seconds === 1
          ? `${data.seconds} second`
          : ''
      }`.trim();

    case 'with-time':
      return `${
        data.years !== 1 && data.years !== 0
          ? `${data.years} years`
          : data.years === 1
          ? `${data.years} year`
          : ''
      } ${
        data.months !== 1 && data.months !== 0
          ? `${data.months} months`
          : data.months === 1
          ? `${data.months} month`
          : ''
      } ${
        data.days !== 1 && data.days !== 0
          ? `${data.days} days`
          : data.days === 1
          ? `${data.days} day`
          : ''
      } ${
        data.hours !== 1 && data.hours !== 0
          ? `${data.hours} hours`
          : data.hours === 1
          ? `${data.hours} hour`
          : ''
      } ${
        data.minutes !== 1 && data.minutes !== 0
          ? `${data.minutes} minutes`
          : data.minutes === 1
          ? `${data.minutes} minute`
          : ''
      } ${
        data.minutes === 0 && data.seconds !== 1 && data.seconds !== 0
          ? `${data.seconds} seconds`
          : data.seconds === 1
          ? `${data.seconds} second`
          : ''
      }`.trim();

    default:
      return duration;
  }
};

// find overdue time
export const getOverdueTime = (date: any, interval: number) => {
  const overdueTime = moment(date).add(interval, 'minutes');
  const currentTime = moment();
  if (overdueTime.isBefore(currentTime)) {
    const overdueDuration: any = moment.duration(currentTime.diff(overdueTime));
    const data: any = overdueDuration && overdueDuration._data;
    const overdueData = `${
      data.years !== 1 && data.years !== 0
        ? `${data.years} years`
        : data.years === 1
        ? `${data.years} year`
        : ''
    } ${
      data.months !== 1 && data.months !== 0
        ? `${data.months} months`
        : data.months === 1
        ? `${data.months} month`
        : ''
    } ${
      data.days !== 1 && data.days !== 0
        ? `${data.days} days`
        : data.days === 1
        ? `${data.days} day`
        : ''
    } ${
      data.hours !== 1 && data.hours !== 0
        ? `${data.hours} hours`
        : data.hours === 1
        ? `${data.hours} hour`
        : ''
    } ${
      data.minutes !== 1 && data.minutes !== 0
        ? `${data.minutes} minutes`
        : data.minutes === 1
        ? `${data.minutes} minute`
        : ''
    } ${
      data.minutes === 0 && data.seconds !== 1 && data.seconds !== 0
        ? `${data.seconds} seconds`
        : data.seconds === 1
        ? `${data.seconds} second`
        : ''
    }`.trim();
    return overdueData;
  }
  return null;
};

export const add3Dots = (string: string, limit: number) => {
  const dots = '...';
  if (string && string?.length > limit) {
    // you can also use substr instead of substring
    string = string.substring(0, limit) + dots;
  }

  return string;
};

export const getAttachmentURL = (url: string) => {
  const checkURL = !/^(http|https):\/\//gi.test(url) ? `${API_URL}${url}` : url;
  return checkURL;
};

export const formatFileSize = (sizeInBytes: any) => {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} ${sizes[0]}`;
  }
  const i = Math.floor(Math.log(sizeInBytes) / Math.log(1024));
  const formattedSize = (sizeInBytes / 1024 ** i).toFixed(2);
  return `${formattedSize} ${sizes[i]}`;
};

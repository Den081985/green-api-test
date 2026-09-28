import axios from 'axios';

import config from '@/app/config';
import { replaceUrlParam } from '@/shared/helpers/queryParams/url';

import { getApiSession } from './session';

const axiosInstance = axios.create({
  timeout: config.httpBaseTimeout,
  withCredentials: false,
});
axiosInstance.interceptors.request.use((request) => {
  const session = getApiSession();
  if (!session) throw new Error('Подключитесь к аккаунту заново.');
  request.baseURL = session.apiUrl;
  request.url = replaceUrlParam(request.url ?? '', {
    idInstance: session.idInstance,
    apiTokenInstance: session.apiTokenInstance,
  });
  return request;
});
export default axiosInstance;

import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

import axiosInstance from '@/app/api/axios';
import { showMessage } from '@/shared/helpers/messageService';
import type { ApiError, ApiRequest } from '@/shared/types/api';

export const axiosBaseQuery =
  (): BaseQueryFn<ApiRequest, unknown, ApiError> =>
  async ({ url, method = 'GET', body, params, silent }, { signal }) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data: body,
        params,
        signal,
      });
      return { data: result.data === '' ? null : result.data };
    } catch (error) {
      if (signal.aborted || axios.isCancel(error))
        return { error: { status: 'ABORTED', message: 'Запрос отменён.' } };
      const status = axios.isAxiosError(error)
        ? error.response?.status
        : undefined;
      const messages: Record<number, string> = {
        400: 'Проверьте параметры запроса и настройки инстанса.',
        401: 'Неверные данные подключения.',
        403: 'Доступ запрещён. Проверьте токен и состояние аккаунта.',
        429: 'Лимит запросов. Попробуйте немного позже.',
      };
      const message = status
        ? (messages[status] ??
          `Ошибка GREEN-API (${status}). Попробуйте позже.`)
        : 'Нет ответа от GREEN-API. Проверьте интернет и apiUrl.';
      if (!silent) showMessage.error(message);
      // Do not forward AxiosError: it includes the secret-bearing request URL.
      return { error: { status: status ?? 'NETWORK_ERROR', message } };
    }
  };
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});

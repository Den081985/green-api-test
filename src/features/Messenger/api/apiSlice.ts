import { createApi } from '@reduxjs/toolkit/query/react';

import apiEndpoints from '@/app/api/apiEndpoints';
import { axiosBaseQuery } from '@/shared/api/apiSlice';
import { errorText } from '@/shared/helpers/errors';

import { validateSettings } from '../helpers/validation';
import type {
  AccountResponse,
  InstanceSettings,
  InstanceState,
  Notification,
  SendResponse,
} from '../types';

export const messengerApi = createApi({
  reducerPath: 'messengerApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Connection', 'Account', 'Messages'],
  keepUnusedDataFor: 0,
  endpoints: (build) => ({
    connect: build.mutation<null, void>({
      async queryFn(_args, _api, _options, baseQuery) {
        const state = await baseQuery({
          url: apiEndpoints.state,
          silent: true,
        });
        if (state.error) return { error: state.error };
        if ((state.data as InstanceState)?.stateInstance !== 'authorized')
          return {
            error: {
              status: 'VALIDATION_ERROR',
              message:
                'Авторизуйте инстанс MAX в кабинете GREEN-API и попробуйте снова.',
            },
          };
        const settings = await baseQuery({
          url: apiEndpoints.settings,
          silent: true,
        });
        if (settings.error) return { error: settings.error };
        try {
          validateSettings((settings.data ?? {}) as InstanceSettings);
        } catch (error) {
          return {
            error: { status: 'VALIDATION_ERROR', message: errorText(error) },
          };
        }
        return { data: null };
      },
      invalidatesTags: ['Connection'],
    }),
    resolvePhone: build.mutation<AccountResponse, string>({
      query: (phone) => ({
        url: apiEndpoints.account,
        method: 'POST',
        body: { phoneNumber: Number(phone) },
        silent: true,
      }),
      invalidatesTags: ['Account'],
    }),
    sendMessage: build.mutation<
      SendResponse,
      { chatId: string; message: string }
    >({
      query: (body) => ({
        url: apiEndpoints.send,
        method: 'POST',
        body,
        silent: true,
      }),
      invalidatesTags: ['Messages'],
    }),

    receive: build.mutation<Notification | null, void>({
      query: () => ({
        url: apiEndpoints.receive,
        params: { receiveTimeout: 25 },
        silent: true,
      }),
      invalidatesTags: [],
    }),
    acknowledge: build.mutation<{ result: boolean }, number>({
      query: (receiptId) => ({
        url: apiEndpoints.acknowledge.replace(
          ':receiptId',
          encodeURIComponent(String(receiptId))
        ),
        method: 'DELETE',
        silent: true,
      }),
      invalidatesTags: [],
    }),
  }),
});
export const {
  useConnectMutation,
  useResolvePhoneMutation,
  useSendMessageMutation,
} = messengerApi;

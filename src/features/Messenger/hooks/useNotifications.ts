import { useEffect } from 'react';

import { useAppDispatch } from '@/app/store';
import { unwrapWithSignal } from '@/shared/helpers/async';

import { messengerApi } from '../api/apiSlice';
import { poll } from '../helpers/poll';
import { eventReceived } from '../store/reducers/messengerSlice';

export const useNotifications = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();

    void poll(
      {
        receive: (signal) =>
          unwrapWithSignal(
            dispatch(
              messengerApi.endpoints.receive.initiate(undefined, {
                track: false,
              })
            ),
            signal
          ),
        acknowledge: async (id, signal) => {
          const result = await unwrapWithSignal(
            dispatch(
              messengerApi.endpoints.acknowledge.initiate(id, { track: false })
            ),
            signal
          );
          if (!result?.result)
            throw new Error(
              'Не удалось подтвердить получение сообщения. Опрос остановлен.'
            );
        },
      },
      controller.signal,
      (event) => {
        dispatch(eventReceived(event));
      }
    );

    return () => controller.abort();
  }, [dispatch]);
};

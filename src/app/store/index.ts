import { useDispatch, useSelector, useStore } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { messengerApi } from '@/features/Messenger/api/apiSlice';
import {
  messengerSlice,
  type MessengerState,
} from '@/features/Messenger/store/reducers/messengerSlice';
import { apiSlice } from '@/shared/api/apiSlice';
import {
  sessionSlice,
  type SessionState,
} from '@/shared/store/reducers/sessionSlice';

export interface RootState {
  Session: SessionState;
  Messenger: MessengerState;
  api: ReturnType<typeof apiSlice.reducer>;
  messengerApi: ReturnType<typeof messengerApi.reducer>;
}
export const createAppStore = () =>
  configureStore({
    reducer: {
      Session: sessionSlice.reducer,
      Messenger: messengerSlice.reducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
      [messengerApi.reducerPath]: messengerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        apiSlice.middleware,
        messengerApi.middleware
      ),
    devTools: false,
  });
export const store = createAppStore();
export type AppStore = ReturnType<typeof createAppStore>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

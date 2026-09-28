import { useState } from 'react';
import { Form } from 'antd';

import { clearApiSession } from '@/app/api/session';
import { useAppDispatch, useAppSelector, useAppStore } from '@/app/store';
import { apiSlice } from '@/shared/api/apiSlice';
import { unwrapWithSignal } from '@/shared/helpers/async';
import { errorText } from '@/shared/helpers/errors';
import { useRequestScope } from '@/shared/hooks/useRequestScope';
import { sessionEnded } from '@/shared/store/reducers/sessionSlice';

import {
  messengerApi,
  useResolvePhoneMutation,
  useSendMessageMutation,
} from '../api/apiSlice';
import { MAX_MESSAGE_LENGTH } from '../const';
import { normalizePhone } from '../helpers/validation';
import {
  chatOpened,
  chatSelected,
  draftChanged,
  messageSent,
} from '../store/reducers/messengerSlice';
import {
  activeChatSelector,
  draftSelector,
  visibleChatsSelector,
} from '../store/selectors';
import { useNotifications } from './useNotifications';

export const useMessenger = () => {
  useNotifications();
  const dispatch = useAppDispatch();
  const store = useAppStore();
  const active = useAppSelector(activeChatSelector);
  const chats = useAppSelector(visibleChatsSelector);
  const draft = useAppSelector(draftSelector);
  const [resolvePhone, { isLoading: creating }] = useResolvePhoneMutation();
  const [sendMessage, { isLoading: sending }] = useSendMessageMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [createError, setCreateError] = useState('');
  const [sendError, setSendError] = useState<{
    id: string;
    text: string;
  } | null>(null);
  const [phoneForm] = Form.useForm<{ phone: string }>();
  const scope = useRequestScope();

  const createChat = async ({ phone }: { phone: string }) => {
    if (creating) return;
    const { signal } = scope.current;
    setCreateError('');
    try {
      const normalized = normalizePhone(phone);
      const known = store
        .getState()
        .Messenger.chats.find((chat) => chat.phone === normalized);
      let id = known?.id;
      if (!id) {
        const result = await unwrapWithSignal(resolvePhone(normalized), signal);
        if (result.status === false)
          throw new Error(
            'Не удалось проверить номер. Проверьте состояние инстанса и лимиты MAX.'
          );
        if (!result.exist || !result.chatId)
          throw new Error(
            'Аккаунт MAX не найден или недоступен по этому номеру.'
          );
        id = String(result.chatId);
      }
      if (signal.aborted) return;
      dispatch(chatOpened({ id, phone: normalized }));
      setModalOpen(false);
      phoneForm.resetFields();
    } catch (err) {
      if (!signal.aborted) setCreateError(errorText(err));
    }
  };

  const send = async () => {
    if (
      !active ||
      !draft.trim() ||
      sending ||
      draft.length > MAX_MESSAGE_LENGTH
    )
      return;
    const { id } = active;
    const original = draft;
    const text = draft.trim();
    const { signal } = scope.current;
    setSendError(null);
    try {
      const result = await unwrapWithSignal(
        sendMessage({ chatId: id, message: text }),
        signal
      );
      if (signal.aborted) return;
      if (!result?.idMessage) throw new Error('Сервис не подтвердил отправку.');
      dispatch(
        messageSent({
          chatId: id,
          original,
          message: {
            id: result.idMessage,
            text,
            timestamp: Date.now(),
            outgoing: true,
          },
        })
      );
    } catch (err) {
      if (!signal.aborted)
        setSendError({
          id,
          text:
            `${errorText(err)} Текст сохранён. ` +
            'Проверьте соединение перед повторной отправкой.',
        });
    }
  };

  const logout = () => {
    scope.current.abort();
    // Abort queued and in-flight requests before resetting state or credentials.
    dispatch(messengerApi.util.getRunningMutationsThunk()).forEach((request) =>
      request.abort()
    );
    clearApiSession();
    dispatch(sessionEnded());
    dispatch(messengerApi.util.resetApiState());
    dispatch(apiSlice.util.resetApiState());
  };

  return {
    active,
    chats,
    draft,
    creating,
    sending,
    modalOpen,
    createError,
    sendError: sendError?.id === active?.id ? sendError?.text : undefined,
    phoneForm,
    createChat,
    send,
    logout,
    select: (id: string | null) => dispatch(chatSelected(id)),
    editDraft: (text: string) => {
      if (active) dispatch(draftChanged({ id: active.id, text }));
    },
    openModal: () => {
      setCreateError('');
      setModalOpen(true);
    },
    closeModal: () => {
      if (!creating) setModalOpen(false);
    },
  };
};

export type MessengerView = ReturnType<typeof useMessenger>;

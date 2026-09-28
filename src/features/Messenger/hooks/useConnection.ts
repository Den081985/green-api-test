import { useState } from 'react';
import { Form } from 'antd';

import { clearApiSession, setApiSession } from '@/app/api/session';
import config from '@/app/config';
import { useAppDispatch } from '@/app/store';
import { unwrapWithSignal } from '@/shared/helpers/async';
import { errorText } from '@/shared/helpers/errors';
import { useRequestScope } from '@/shared/hooks/useRequestScope';
import { sessionStarted } from '@/shared/store/reducers/sessionSlice';
import type { Credentials } from '@/shared/types/session';

import { useConnectMutation } from '../api/apiSlice';
import { normalizeApiUrl } from '../helpers/validation';

export const useConnection = () => {
  const [form] = Form.useForm<Credentials>();
  const [connect, { isLoading }] = useConnectMutation();
  const [error, setError] = useState('');
  const scope = useRequestScope();
  const dispatch = useAppDispatch();

  const submit = async (values: Credentials) => {
    if (isLoading) return;
    setError('');
    const { signal } = scope.current;
    try {
      const credentials = {
        apiUrl: normalizeApiUrl(values.apiUrl.trim()),
        idInstance: values.idInstance.trim(),
        apiTokenInstance: values.apiTokenInstance.trim(),
      };
      if (
        !/^\d+$/.test(credentials.idInstance) ||
        !credentials.apiTokenInstance
      )
        throw new Error('Проверьте ID инстанса и токен.');
      setApiSession(credentials);
      await unwrapWithSignal(connect(), signal);
      if (!signal.aborted) {
        form.resetFields();
        dispatch(sessionStarted());
      }
    } catch (err) {
      clearApiSession();
      if (!signal.aborted) setError(errorText(err));
    }
  };

  return {
    form,
    submit,
    isLoading,
    error,
    initialValues: { apiUrl: config.apiBaseUrl },
  };
};

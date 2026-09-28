import { useEffect } from 'react';
import { App } from 'antd';

import { bindMessageService } from '@/shared/helpers/messageService';

const MessageBridge = () => {
  const { message } = App.useApp();
  useEffect(() => {
    bindMessageService({
      error: (text) => {
        void message.error(text);
      },
      warning: (text) => {
        void message.warning(text);
      },
    });
    return () => bindMessageService(null);
  }, [message]);
  return null;
};

export default MessageBridge;

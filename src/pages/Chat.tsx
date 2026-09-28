import { memo } from 'react';
import { Helmet } from 'react-helmet-async';

import Messenger from '@/features/Messenger';

const ChatPage = () => (
    <>
      <Helmet>
        <title>Сообщения · MAX Чат</title>
      </Helmet>
      <Messenger screen="chat" />
    </>
  );
export default memo(ChatPage);

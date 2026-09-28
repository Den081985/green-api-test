import { memo } from 'react';
import { Helmet } from 'react-helmet-async';

import Messenger from '@/features/Messenger';

const ConnectionPage = () => (
    <>
      <Helmet>
        <title>Подключение · MAX Чат</title>
      </Helmet>
      <Messenger screen="connection" />
    </>
  );
export default memo(ConnectionPage);

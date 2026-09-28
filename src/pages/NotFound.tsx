import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Result } from 'antd';

const NotFound = () => (
    <Result
      status="404"
      title="Страница не найдена"
      extra={<Link to="/">На главную</Link>}
    />
  );
export default memo(NotFound);

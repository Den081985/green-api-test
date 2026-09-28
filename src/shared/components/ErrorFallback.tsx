import { Button, Result } from 'antd';

const ErrorFallback = () => (
    <Result
      status="error"
      title="Не удалось открыть приложение"
      extra={
        <Button onClick={() => window.location.reload()}>Перезагрузить</Button>
      }
    />
  );

export default ErrorFallback;

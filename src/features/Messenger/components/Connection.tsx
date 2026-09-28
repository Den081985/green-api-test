import { ArrowRightOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Form, Input, Typography } from 'antd';

import Brand from '@/shared/components/Brand';

import { useConnection } from '../hooks/useConnection';

import classes from '../styles/index.module.less';

const { Title, Paragraph } = Typography;

const Connection = () => {
  const { form, submit, isLoading, error, initialValues } = useConnection();
  return (
    <div className={classes.login}>
      <div className={classes.loginBrand}>
        <Brand />
      </div>
      <Card className={classes.loginCard}>
        <Title level={2}>Добро пожаловать</Title>
        <Paragraph type="secondary">
          Подключите свой аккаунт MAX через GREEN-API
        </Paragraph>
        <Form
          form={form}
          layout="vertical"
          onFinish={submit}
          initialValues={initialValues}
          disabled={isLoading}
          requiredMark={false}
        >
          <Form.Item
            label="API URL"
            name="apiUrl"
            rules={[{ required: true, message: 'Укажите apiUrl из кабинета.' }]}
          >
            <Input placeholder="https://3100.api.green-api.com" />
          </Form.Item>
          <Form.Item
            label="ID инстанса"
            name="idInstance"
            rules={[{ required: true, message: 'Введите ID инстанса.' }]}
          >
            <Input inputMode="numeric" placeholder="Введите idInstance" />
          </Form.Item>
          <Form.Item
            label="Токен доступа"
            name="apiTokenInstance"
            rules={[{ required: true, message: 'Введите токен доступа.' }]}
          >
            <Input.Password
              placeholder="Введите apiTokenInstance"
              autoComplete="off"
            />
          </Form.Item>
          {error && (
            <Alert
              type="error"
              message={error}
              role="alert"
              showIcon
              className={classes.alert}
            />
          )}
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
            icon={<ArrowRightOutlined />}
          >
            Открыть чат
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Connection;

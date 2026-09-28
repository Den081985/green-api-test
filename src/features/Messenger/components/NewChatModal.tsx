import { Alert, Button, Form, Input, Modal, Typography } from 'antd';

import type { MessengerView } from '../hooks/useMessenger';

import classes from '../styles/index.module.less';

type Props = Pick<
  MessengerView,
  | 'modalOpen'
  | 'creating'
  | 'createError'
  | 'phoneForm'
  | 'closeModal'
  | 'createChat'
>;
const NewChatModal = ({
  modalOpen,
  creating,
  createError,
  phoneForm,
  closeModal,
  createChat,
}: Props) => (
    <Modal
      title="Новый чат"
      open={modalOpen}
      onCancel={closeModal}
      footer={null}
      closable={!creating}
      maskClosable={!creating}
      keyboard={!creating}
      destroyOnClose
    >
      <Typography.Paragraph type="secondary">
        Введите номер телефона получателя в MAX.
      </Typography.Paragraph>
      <Form
        form={phoneForm}
        layout="vertical"
        onFinish={createChat}
        disabled={creating}
        requiredMark={false}
      >
        <Form.Item
          label="Номер телефона"
          name="phone"
          rules={[{ required: true, message: 'Введите номер телефона.' }]}
        >
        <Input type="tel" placeholder="+7 (999) 123-45-67 или 8 (999) 123-45-67" />
        </Form.Item>
        {createError && (
          <Alert
            type="error"
            message={createError}
            role="alert"
            className={classes.alert}
          />
        )}
        <Button type="primary" htmlType="submit" block loading={creating}>
          Начать разговор
        </Button>
      </Form>
    </Modal>
  );

export default NewChatModal;

import {
  ArrowLeftOutlined,
  MessageOutlined,
  PlusOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Alert, Avatar, Button, Input, Typography } from 'antd';

import { MAX_MESSAGE_LENGTH } from '../const';
import type { MessengerView } from '../hooks/useMessenger';
import MessageList from './MessageList';

import classes from '../styles/index.module.less';

type Props = Pick<
  MessengerView,
  | 'active'
  | 'draft'
  | 'sending'
  | 'sendError'
  | 'editDraft'
  | 'send'
  | 'select'
  | 'openModal'
>;
const Conversation = ({
  active,
  draft,
  sending,
  sendError,
  editDraft,
  send,
  select,
  openModal,
}: Props) => (
  <div className={classes.conversation}>
    {active ? (
      <>
        <div className={classes.conversationHeader}>
          <Button
            className={classes.back}
            type="text"
            aria-label="К списку чатов"
            icon={<ArrowLeftOutlined />}
            onClick={() => select(null)}
          />
          <Avatar className={classes.avatar}>
            {active.name.replace(/^\+/, '').slice(0, 2)}
          </Avatar>
          <div>
            <Typography.Text strong>{active.name}</Typography.Text>
            <div className={classes.subtitle}>
              {active.phone ? `+${active.phone} · MAX` : 'Личный чат · MAX'}
            </div>
          </div>
        </div>
        <MessageList chat={active} />
        <div className={classes.composerArea}>
          {sendError && (
            <Alert
              type="error"
              message={sendError}
              role="alert"
              className={classes.alert}
            />
          )}
          <div className={classes.composer}>
            <Input.TextArea
              aria-label="Сообщение"
              placeholder="Напишите сообщение…"
              autoSize={{ minRows: 1, maxRows: 5 }}
              maxLength={MAX_MESSAGE_LENGTH}
              value={draft}
              onChange={(event) => editDraft(event.target.value)}
              onKeyDown={(event) => {
                if (
                  event.key === 'Enter' &&
                  !event.shiftKey &&
                  !event.nativeEvent.isComposing
                ) {
                  event.preventDefault();
                  void send();
                }
              }}
            />
            <Button
              type="primary"
              aria-label="Отправить сообщение"
              icon={<SendOutlined />}
              disabled={!draft.trim()}
              loading={sending}
              onClick={() => send()}
            />
          </div>
          <div className={classes.composerHint}>
            <span>Enter — отправить · Shift + Enter — новая строка</span>
            <span>
              {draft.length} / {MAX_MESSAGE_LENGTH}
            </span>
          </div>
        </div>
      </>
    ) : (
      <div className={classes.welcome}>
        <MessageOutlined className={classes.welcomeIcon} />
        <Typography.Paragraph type="secondary">
          Выберите чат слева или создайте новый,
          <br />
          чтобы отправить сообщение в MAX.
        </Typography.Paragraph>
        <Button type="primary" icon={<PlusOutlined />} onClick={openModal}>
          Новый чат
        </Button>
      </div>
    )}
  </div>
);

export default Conversation;

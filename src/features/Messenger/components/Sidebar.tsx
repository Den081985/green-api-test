import {
  LogoutOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Empty, Typography } from 'antd';

import Brand from '@/shared/components/Brand';

import { formatTime } from '../helpers/format';
import type { MessengerView } from '../hooks/useMessenger';

import classes from '../styles/index.module.less';

type Props = Pick<
  MessengerView,
  'chats' | 'active' | 'logout' | 'select' | 'openModal'
>;
const Sidebar = ({ chats, active, logout, select, openModal }: Props) => (
  <div className={classes.sidebar}>
    <div className={classes.sidebarHeader}>
      <Brand />
      <Button
        type="text"
        aria-label="Выйти"
        title="Выйти"
        icon={<LogoutOutlined />}
        onClick={logout}
      />
    </div>
    <div className={classes.sidebarTitle}>
      <Typography.Title level={3}>Сообщения</Typography.Title>
      <Button
        aria-label="Новый чат"
        type="text"
        icon={<PlusOutlined />}
        onClick={openModal}
      />
    </div>
    <div className={classes.chatList} aria-label="Список чатов">
      {chats.map((chat) => (
        <button
          type="button"
          data-testid="chat-item"
          key={chat.id}
          className={`${classes.chatItem} ${chat.id === active?.id ? classes.selected : ''}`}
          onClick={() => select(chat.id)}
        >
          <Avatar size={44} className={classes.avatar}>
            {chat.name.replace(/^\+/, '').slice(0, 2)}
          </Avatar>
          <span className={classes.chatSummary}>
            <span className={classes.chatTop}>
              <strong>{chat.name}</strong>
              {chat.messages.length > 0 && (
                <span>{formatTime(chat.messages.at(-1)!.timestamp)}</span>
              )}
            </span>
            <span className={classes.chatBottom}>
              <span>{chat.messages.at(-1)?.text ?? 'Начните разговор'}</span>
            </span>
          </span>
        </button>
      ))}
      {chats.length === 0 && (
        <Empty
          className={classes.emptyList}
          description="Здесь будут ваши чаты"
        >
          <Typography.Text type="secondary">
            Нажмите +, чтобы написать первым
          </Typography.Text>
        </Empty>
      )}
    </div>
  </div>
);

export default Sidebar;

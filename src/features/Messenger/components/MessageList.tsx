import { Empty } from 'antd';

import { formatDay, formatTime } from '../helpers/format';
import { useMessageScroll } from '../hooks/useMessageScroll';
import type { Chat } from '../types';

import classes from '../styles/index.module.less';

const MessageList = ({ chat }: { chat: Chat }) => {
  const end = useMessageScroll(chat.id, chat.messages.length);
  return (
    <div className={classes.messages} role="log" aria-label="Сообщения">
      {chat.messages.length === 0 && (
        <Empty
          description="Напишите первое сообщение"
          className={classes.emptyMessages}
        />
      )}
      {chat.messages.map((message, index) => (
        <div key={message.id}>
          {(index === 0 ||
            new Date(message.timestamp).toDateString() !==
              new Date(chat.messages[index - 1].timestamp).toDateString()) && (
            <div className={classes.day}>{formatDay(message.timestamp)}</div>
          )}
          <div
            className={[
              classes.bubble,
              message.outgoing ? classes.outgoing : classes.incoming,
            ].join(' ')}
          >
            <div>{message.text}</div>
            <span className={classes.messageMeta}>
              <span>{formatTime(message.timestamp)}</span>
            </span>
          </div>
        </div>
      ))}
      <div ref={end} />
    </div>
  );
};

export default MessageList;

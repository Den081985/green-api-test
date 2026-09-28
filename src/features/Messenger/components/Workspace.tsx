import { useMessenger } from '../hooks/useMessenger';
import Conversation from './Conversation';
import NewChatModal from './NewChatModal';
import Sidebar from './Sidebar';

import classes from '../styles/index.module.less';

const Workspace = () => {
  const view = useMessenger();
  return (
    <div
      className={`${classes.shell} ${view.active ? classes.hasActive : ''}`}
    >
      <Sidebar {...view} />
      <Conversation {...view} />
      <NewChatModal {...view} />
    </div>
  );
};

export default Workspace;

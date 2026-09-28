import Connection from './components/Connection';
import Workspace from './components/Workspace';

const Messenger = ({
  screen,
}: {
  screen: 'connection' | 'chat';
}) => (screen === 'connection' ? <Connection /> : <Workspace />);

export default Messenger;

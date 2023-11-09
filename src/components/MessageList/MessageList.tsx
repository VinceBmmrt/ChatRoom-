import Message from '../Message/Message';
import './MessageList.scss';

function MessageList() {
  return (
    <div className="message-list">
      <Message />
      <Message />
      <Message />
      {Array.from({ length: 50 }).map(() => (
        <Message />
      ))}
    </div>
  );
}

export default MessageList;

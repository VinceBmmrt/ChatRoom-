import { useAppSelector } from '../../hooks/redux';
import Message from '../Message/Message';
import './MessageList.scss';

function MessageList() {
  // Depuis mon store redux, je vais récupérer la liste des messages
  // Je récupère la donnée ET je m'abonne à ses modifications
  const messages = useAppSelector((state) => state.chat.messages);

  return (
    <div className="message-list">
      {messages.map((message) => (
        <Message
          key={message.id}
          author={message.author}
          content={message.content}
        />
      ))}
    </div>
  );
}

export default MessageList;

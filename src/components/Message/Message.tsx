import clsx from 'clsx';
import { useAppSelector } from '../../hooks/redux';
import './Message.scss';
import { selectIsMine } from '../../store/reducers/chat';

type MessageProps = {
  author: string;
  content: string;
};

function Message({ author, content }: MessageProps) {
  // Je vais récupérer l'information de mon store redux
  const isMine = useAppSelector((state) => selectIsMine(state, author));

  return (
    <div
      className={clsx('message', {
        'message--me': isMine,
      })}
    >
      <div className="message__author">{author}</div>
      <div className="message__content">{content}</div>
    </div>
  );
}

export default Message;

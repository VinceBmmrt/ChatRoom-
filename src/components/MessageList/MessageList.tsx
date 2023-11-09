import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../hooks/redux';
import Message from '../Message/Message';
import './MessageList.scss';

function MessageList() {
  // Je créer une nouvelle ref, je précise avec TypeScript qu'elle contiendra un element HTMLDivElement
  // On doit l'initialiser à null
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Depuis mon store redux, je vais récupérer la liste des messages
  // Je récupère la donnée ET je m'abonne à ses modifications
  const messages = useAppSelector((state) => state.chat.messages);

  // Le useEffect me permet de réagir lorsqu'un nouveau message arrive. (mon tableau de messages est modifié)
  useEffect(() => {
    // scrollIntoView permet de scroller jusqu'à un élément
    // Comme mon élément est en bas de ma liste de message. Je scroll en bas de la liste de message.
    // J'utilise l'élément stocker dans ma ref pour scroller jusqu'à lui
    // Le `?` est mis avis d'éviter les erreurs si mon élément HTML n'est pas trouvé
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <div className="message-list">
      {messages.map((message) => (
        <Message
          key={message.id}
          author={message.author}
          content={message.content}
        />
      ))}
      {/* Je précise que ma div ici sera liée à la ref messagesEndRef */}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;

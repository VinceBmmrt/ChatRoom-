/* eslint-disable import/prefer-default-export */
import store from '../store';
import { changeInputValue } from '../store/reducers/chat';
import { socket } from './io';

export const sendMessage = () => {
  // Il est possible d'utiliser le store redux directement dans nos fonctions.
  // Cela me permet de récupérer toutes les informations de mon store redux sans avoir à m'abonner au modification comme le ferai le `useSelector`
  const state = store.getState();

  // Je prépare mon message
  const message = {
    author: state.settings.pseudo,
    content: state.chat.inputValue,
  };

  // J'envoie ensuite le message au serveur
  socket.emit('send_message', message);

  // Une fois le message envoyer, je vais vider le champ de saisie
  store.dispatch(changeInputValue(''));
};

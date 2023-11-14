import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Si j'ai besoin d'importer le RootState, je dois préciser que c'est un import de type et non un import de valeur.
// Cela permet d'éviter les import cyclique.
// reducer importe le store qui importe le reducer qui importe le store...
import type { RootState } from '..';

type Message = {
  id: string;
  author: string;
  content: string;
};

type ChatState = {
  messages: Message[];
  inputValue: string;
};

// De manière générale, on va toujours définir le type pour notre état initial.
// Cela permet par exemple de dire ce que contiendra nos tableaux. (souvent en état initial, les tableaux sont vides)
const initialState: ChatState = {
  messages: [],
  inputValue: '',
};

// Pour créer mon reducer, je vais utiliser la fonction createSlice() de Redux Toolkit.
const chatSlice = createSlice({
  // Je fournis un nom qui sera utiliser comme prefix pour les actions générées par Redux Toolkit.
  name: 'chat',
  // Je lui passe un objet contenant les données initials à gérer.
  // Mon store les récupérera lors de sa création.
  initialState,
  // Il prendra un objet contenant les actions qu'il pourra gérer.
  // Comme le switch case en redux classique
  reducers: {
    changeInputValue(state, action: PayloadAction<string>) {
      state.inputValue = action.payload;
    },
    addNewMessage(state) {
      const newMessage = {
        id: crypto.randomUUID(),
        author: 'Moi',
        // Je récupère la valeur de l'input qui est déjà stocker dans mon state.
        content: state.inputValue,
      };

      // Comme j'utilise redux toolkit, pas besoin de m'embête avec l'immutabilité. C'est gérer automatiquement.
      state.messages.push(newMessage);
      // Après avoir ajouter mon message, je vide mon input.
      state.inputValue = '';
    },
    // On utilisera cette intention pour ajouter le message envoyer par le serveur dans notre liste de messages
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
  },
});

export const { changeInputValue, addNewMessage, addMessage } =
  chatSlice.actions;

export const selectIsMine = (state: RootState, author: string) =>
  state.settings.pseudo === author;

export const selectMessages = (state: RootState) => state.chat.messages;

// export const selectIsMine = (author: string) => (state: RootState) =>
//   state.settings.pseudo === author;

// J'exporte le reducer généré par Redux Toolkit.
export default chatSlice.reducer;

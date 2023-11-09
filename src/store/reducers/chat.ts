import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  messages: [
    {
      id: crypto.randomUUID(),
      author: 'Moi',
      content: 'Salut, ça va ?',
    },
    {
      id: crypto.randomUUID(),
      author: 'Jules',
      content: 'Oui et toi ?',
    },
    {
      id: crypto.randomUUID(),
      author: 'Moi',
      content: 'Oui, merci !',
    },
    {
      id: crypto.randomUUID(),
      author: 'Jules',
      content: 'Tu fais quoi ?',
    },
  ],
  inputValue: 'Yeah Men !',
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
  },
});

export const { changeInputValue, addNewMessage } = chatSlice.actions;

// J'exporte le reducer généré par Redux Toolkit.
export default chatSlice.reducer;

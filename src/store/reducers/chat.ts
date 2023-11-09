import { createSlice } from '@reduxjs/toolkit';

type Message = {
  id: string;
  author: string;
  content: string;
};

type ChatState = {
  messages: Message[];
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
  reducers: {},
});

// export const {} = chatSlice.actions;

// J'exporte le reducer généré par Redux Toolkit.
export default chatSlice.reducer;

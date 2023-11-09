import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

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

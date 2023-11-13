import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type SettingsState = {
  isOpen: boolean;
  credentials: {
    email: string;
    password: string;
  };
  pseudo: string;
  error: null | string;
  isLoading: boolean;
};

const initialState: SettingsState = {
  isOpen: true,
  credentials: {
    // Pour ne pas avoir à renseigner à chaque fois les identifiants, je me permet à des fin de test uniquement, de renseigner les identifiants par défaut.
    // (ne jamais push ça en prod)
    email: 'bouclierman@herocorp.io',
    password: 'jennifer',
  },
  pseudo: 'Anonymous',
  error: null,
  isLoading: false,
};

// Je vais vouloir faire une requête à mon API. Redux toolkit me met à disposition une fonction pour faire cela.
// createAsyncThunk qui permet de créer une action disposant de 3 états:
// - pending: la requête est en cours
// - fulfilled: la requête est terminée et a réussi
// - rejected: la requête est terminée et a échoué
// createAsyncThunk prend 2 paramètres:
// - le nom de l'action
// - une fonction qui retourne une promesse. C'est dans cette fonction que l'on fera notre appel API.
type LoginCredentials = { email: string; password: string };

export const login = createAsyncThunk(
  'settings/login',
  // mon action prendra en paramètre un objet avec email et password
  async (credentials: LoginCredentials) => {
    // J'appel mon api
    // Je précise le type de donnée que l'API va me retourner (ici un objet avec une propriété pseudo)
    const { data } = await axios.post<{ pseudo: string }>(
      'http://localhost:3001/login',
      credentials
    );

    // Je retourne les données récupérer depuis mon API
    return data;
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleSettings(state) {
      // J'inverse la valeur de isOpen
      // true => false, false => true
      state.isOpen = !state.isOpen;
    },
    changeInputCredentialValue(
      state,
      // Mon payload ne va plus être une simple chaine de caractère mais un objet
      action: PayloadAction<{
        // fieldName correspondra au nom du champ à modifier (email ou password)
        // keyof permet de récupérer la liste des propriétés d'un type
        fieldName: keyof SettingsState['credentials'];
        // value correspondra à la valeur à mettre dans le champ
        value: string;
      }>
    ) {
      // state.credentials.email = action.payload;
      // state.credentials['email'] = action.payload;
      // const monChampAModifier = 'email';
      // state.credentials[monChampAModifier] = action.payload;
      // Je récupère depuis mon payload le nom du champ à modifier et sa valeur
      const { fieldName, value } = action.payload;
      state.credentials[fieldName] = value;
    },
  },
  // Pour pouvoir gérer d'autre action et particulièrement les actions asynchrone, je vais utiliser la propriété extraReducers.
  extraReducers(builder) {
    builder
      // Lorsque mon action asynchrone commence
      .addCase(login.pending, (state) => {
        // J'indique que mon application est en train de charger
        state.isLoading = true;
        // J'efface l'erreur précédente
        state.error = null;
      })
      // Si mon Action asynchrone par en erreur
      .addCase(login.rejected, (state) => {
        state.error = 'Email ou mot de passe incorrect';
        state.isLoading = false;
      })
      // Dans le cas où mon action de connexion est réussi
      .addCase(login.fulfilled, (state, action) => {
        state.isOpen = false;
        state.isLoading = false;
        state.pseudo = action.payload.pseudo;
      });
  },
});

export const { toggleSettings, changeInputCredentialValue } =
  settingsSlice.actions;

export default settingsSlice.reducer;

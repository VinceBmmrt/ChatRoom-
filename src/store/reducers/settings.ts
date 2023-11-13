import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SettingsState = {
  isOpen: boolean;
  credentials: {
    email: string;
    password: string;
  };
};

const initialState: SettingsState = {
  isOpen: true,
  credentials: {
    email: 'toto@toto.com',
    password: 'tata',
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleSettings(state) {
      // J'inverse la valeur de isOpen
      // true => false, false => true
      state.isOpen = !state.isOpen;
    },
    changeInputEmailValue(state, action: PayloadAction<string>) {
      state.credentials.email = action.payload;
    },
  },
});

export const { toggleSettings, changeInputEmailValue } = settingsSlice.actions;

export default settingsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

type SettingsState = {
  isOpen: boolean;
};

const initialState: SettingsState = {
  isOpen: true,
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
  },
});

export const { toggleSettings } = settingsSlice.actions;

export default settingsSlice.reducer;

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
  reducers: {},
});

export default settingsSlice.reducer;

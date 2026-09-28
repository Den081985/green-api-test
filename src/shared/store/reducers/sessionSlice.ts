import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'Session',
  initialState: { connected: false },
  reducers: {
    sessionStarted: (state) => {
      state.connected = true;
    },
    sessionEnded: (state) => {
      state.connected = false;
    },
  },
});
export const { sessionStarted, sessionEnded } = sessionSlice.actions;
export type SessionState = ReturnType<typeof sessionSlice.reducer>;

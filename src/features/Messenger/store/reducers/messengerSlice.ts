import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { sessionEnded } from '@/shared/store/reducers/sessionSlice';

import { applyEvent } from '../../helpers/messages';
import type { Chat, Message, Webhook } from '../../types';

export interface MessengerState {
  chats: Chat[];
  activeId: string | null;
  drafts: Record<string, string>;
}
const initialState: MessengerState = {
  chats: [],
  activeId: null,
  drafts: {},
};
export const messengerSlice = createSlice({
  name: 'Messenger',
  initialState,
  reducers: {
    chatOpened(
      state,
      { payload }: PayloadAction<{ id: string; phone: string }>
    ) {
      const existing = state.chats.find((chat) => chat.id === payload.id);
      if (existing) existing.phone = payload.phone;
      else
        state.chats.push({
          id: payload.id,
          phone: payload.phone,
          name: `+${payload.phone}`,
          messages: [],
        });
      state.activeId = payload.id;
    },
    chatSelected(state, { payload }: PayloadAction<string | null>) {
      state.activeId = payload;
    },
    draftChanged(
      state,
      { payload }: PayloadAction<{ id: string; text: string }>
    ) {
      state.drafts[payload.id] = payload.text;
    },
    messageSent(
      state,
      {
        payload,
      }: PayloadAction<{ chatId: string; message: Message; original: string }>
    ) {
      const chat = state.chats.find((item) => item.id === payload.chatId);
      if (chat && !chat.messages.some((item) => item.id === payload.message.id))
        chat.messages.push(payload.message);
      if (state.drafts[payload.chatId] === payload.original)
        state.drafts[payload.chatId] = '';
    },
    eventReceived(state, { payload }: PayloadAction<Webhook>) {
      state.chats = applyEvent(state.chats, payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sessionEnded, () => initialState);
  },
});
export const {
  chatOpened,
  chatSelected,
  draftChanged,
  messageSent,
  eventReceived,
} = messengerSlice.actions;

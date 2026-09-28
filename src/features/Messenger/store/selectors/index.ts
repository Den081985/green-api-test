import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store';

export const chatsSelector = (state: RootState) => state.Messenger.chats;
export const activeIdSelector = (state: RootState) => state.Messenger.activeId;
const draftsSelector = (state: RootState) => state.Messenger.drafts;
export const activeChatSelector = createSelector(
  [chatsSelector, activeIdSelector],
  (chats, id) => chats.find((chat) => chat.id === id)
);
export const draftSelector = createSelector(
  [draftsSelector, activeIdSelector],
  (drafts, id) => (id ? (drafts[id] ?? '') : '')
);
export const visibleChatsSelector = createSelector(
  [chatsSelector],
  (chats) =>
    [...chats].sort(
      (a, b) =>
        (b.messages.at(-1)?.timestamp ?? 0) -
        (a.messages.at(-1)?.timestamp ?? 0)
    )
);

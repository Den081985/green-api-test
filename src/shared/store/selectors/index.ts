import type { RootState } from '@/app/store';

export const connectedSelector = (state: RootState) => state.Session.connected;

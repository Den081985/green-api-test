import type { Credentials } from '@/shared/types/session';

let credentials: Credentials | null = null;
export const setApiSession = (value: Credentials) => {
  credentials = value;
};
export const clearApiSession = () => {
  credentials = null;
};
export const getApiSession = () => credentials;

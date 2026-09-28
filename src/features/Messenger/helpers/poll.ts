/* eslint-disable no-await-in-loop -- The queue requires sequential receive/process/ack. */
import { delay } from '@/shared/helpers/async';

import type { Notification, Webhook } from '../types';

export const poll = async (
  api: {
    receive: (signal: AbortSignal) => Promise<Notification | null>;
    acknowledge: (id: number, signal: AbortSignal) => Promise<void>;
  },
  signal: AbortSignal,
  onEvent: (event: Webhook) => void
) => {
  while (!signal.aborted) {
    try {
      const notification = await api.receive(signal);
      if (signal.aborted) break;
      if (notification) {
        onEvent(notification.body);
        await api.acknowledge(notification.receiptId, signal);
      }
      await delay(300, signal);
    } catch {
      if (signal.aborted) break;
      return;
    }
  }
};

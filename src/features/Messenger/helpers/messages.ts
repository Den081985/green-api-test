import type { Chat, Message, Webhook } from '../types';

export const applyEvent = (chats: Chat[], event: Webhook): Chat[] => {
  const incoming = event.typeWebhook === 'incomingMessageReceived';

  if (
    !incoming &&
    !['outgoingAPIMessageReceived', 'outgoingMessageReceived'].includes(
      event.typeWebhook
    )
  )
    return chats;

  const sender = event.senderData;
  const data = event.messageData;
  let text: string | undefined;

  if (data?.typeMessage === 'textMessage')
    text = data.textMessageData?.textMessage;
  if (data?.typeMessage === 'extendedTextMessage')
    text = data.extendedTextMessageData?.text;
  if (
    !sender?.chatId ||
    !event.idMessage ||
    text === undefined ||
    sender.chatType === 'group'
  )
    return chats;

  const id = String(sender.chatId);
  const existing = chats.find((c) => c.id === id);

  if (existing?.messages.some((m) => m.id === event.idMessage)) return chats;

  const message: Message = {
    id: event.idMessage,
    text,
    timestamp: (event.timestamp ?? Date.now() / 1000) * 1000,
    outgoing: !incoming,
  };

  const chat: Chat = existing ?? {
    id,
    name: sender.chatName || sender.senderName || id,
    phone: sender.senderPhoneNumber
      ? String(sender.senderPhoneNumber)
      : undefined,
    messages: [],
  };

  const updated = {
    ...chat,
    messages: [...chat.messages, message].sort(
      (a, b) => a.timestamp - b.timestamp
    ),
  };

  return existing
    ? chats.map((c) => (c.id === id ? updated : c))
    : [...chats, updated];
};

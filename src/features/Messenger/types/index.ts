export interface Webhook {
  typeWebhook: string;
  idMessage?: string;
  timestamp?: number;
  chatId?: string;
  senderData?: {
    chatId: string;
    chatName?: string;
    senderName?: string;
    senderPhoneNumber?: number;
    chatType?: string;
  };
  messageData?: {
    typeMessage: string;
    textMessageData?: { textMessage: string };
    extendedTextMessageData?: { text: string };
  };
}
export interface Notification {
  receiptId: number;
  body: Webhook;
}
export interface Message {
  id: string;
  text: string;
  timestamp: number;
  outgoing: boolean;
}
export interface Chat {
  id: string;
  name: string;
  phone?: string;
  messages: Message[];
}

export interface InstanceState {
  stateInstance: string;
}
export interface InstanceSettings {
  webhookUrl?: string;
  incomingWebhook?: string;
}
export interface AccountResponse {
  exist?: boolean;
  chatId?: string;
  status?: boolean;
}
export interface SendResponse {
  idMessage: string;
}

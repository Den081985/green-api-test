interface MessageHandler {
  error: (text: string) => void;
  warning: (text: string) => void;
}
let handler: MessageHandler | null = null;
export const bindMessageService = (value: MessageHandler | null) => {
  handler = value;
};
export const showMessage = {
  error: (text: string) => handler?.error(text),
  warning: (text: string) => handler?.warning(text),
};

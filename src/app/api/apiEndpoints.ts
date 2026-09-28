const prefix = '/waInstance:idInstance';
const apiEndpoints = {
  state: `${prefix}/getStateInstance/:apiTokenInstance`,
  settings: `${prefix}/getSettings/:apiTokenInstance`,
  account: `${prefix}/checkAccount/:apiTokenInstance`,
  send: `${prefix}/sendMessage/:apiTokenInstance`,
  receive: `${prefix}/receiveNotification/:apiTokenInstance`,
  acknowledge: `${prefix}/deleteNotification/:apiTokenInstance/:receiptId`,
};
export default apiEndpoints;

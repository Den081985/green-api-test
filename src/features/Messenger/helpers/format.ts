export const formatTime = (timestamp: number) =>
  new Date(timestamp).toLocaleTimeString('ru', {
    hour: '2-digit',
    minute: '2-digit',
  });

export const formatDay = (timestamp: number) =>
  new Date(timestamp).toLocaleDateString('ru', {
    day: 'numeric',
    month: 'long',
  });

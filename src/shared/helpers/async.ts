export const delay = (ms: number, signal: AbortSignal) => new Promise<void>((resolve) => {
    if (signal.aborted) {
      resolve();
      return;
    }
    const finish = () => {
      clearTimeout(timer);
      signal.removeEventListener('abort', finish);
      resolve();
    };
    const timer = setTimeout(finish, ms);
    signal.addEventListener('abort', finish, { once: true });
  });
export const unwrapWithSignal = async <T>(
  request: { abort: () => void; unwrap: () => Promise<T> },
  signal: AbortSignal
): Promise<T> => {
  const abort = () => request.abort();
  signal.addEventListener('abort', abort, { once: true });
  if (signal.aborted) abort();
  try {
    return await request.unwrap();
  } finally {
    signal.removeEventListener('abort', abort);
  }
};

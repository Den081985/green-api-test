export const errorText = (error: unknown): string => {
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  )
    return error.message;
  return 'Не удалось выполнить запрос. Попробуйте снова.';
};

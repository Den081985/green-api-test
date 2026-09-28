export const replaceUrlParam = (
  url: string,
  params: Record<string, string | number>
) =>
  url.replace(/:([A-Za-z]+)/g, (_, name: string) => {
    if (!(name in params)) throw new Error('Не задан параметр запроса.');
    return encodeURIComponent(String(params[name]));
  });

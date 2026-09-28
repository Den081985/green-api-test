const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
  httpBaseTimeout: Number(import.meta.env.VITE_HTTP_BASE_TIMEOUT) || 40000,
};
export default config;

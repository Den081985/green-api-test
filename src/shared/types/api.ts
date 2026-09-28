export interface ApiError {
  status: number | 'NETWORK_ERROR' | 'VALIDATION_ERROR' | 'ABORTED';
  message: string;
}
export interface ApiRequest {
  url: string;
  method?: 'GET' | 'POST' | 'DELETE';
  body?: unknown;
  params?: Record<string, string | number>;
  silent?: boolean;
}

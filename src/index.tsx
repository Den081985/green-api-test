import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { App as AntdApp } from 'antd';

import App from '@/App';
import { store } from '@/app/store';
import ErrorBoundary from '@/shared/components/ErrorBoundary';
import MessageBridge from '@/shared/components/MessageBridge';
import ThemeProvider from '@/styles/common/theme';

import '@fontsource/manrope/cyrillic-400.css';
import '@fontsource/manrope/cyrillic-500.css';
import '@fontsource/manrope/cyrillic-600.css';
import '@fontsource/manrope/cyrillic-700.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/latin-600.css';
import '@fontsource/manrope/latin-700.css';
import 'antd/dist/reset.css';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <AntdApp>
          <MessageBridge />
          <ErrorBoundary>
            <Provider store={store}>
              <App />
            </Provider>
          </ErrorBoundary>
        </AntdApp>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);

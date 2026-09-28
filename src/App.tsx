import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { useAppSelector } from '@/app/store';
import LoadingScreen from '@/shared/components/LoadingScreen';
import { connectedSelector } from '@/shared/store/selectors';

const Connection = lazy(() => import('@/pages/Connection'));
const Chat = lazy(() => import('@/pages/Chat'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const App = () => {
  const connected = useAppSelector(connectedSelector);
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={connected ? '/chat' : '/login'} replace />}
          />
          <Route
            path="/login"
            element={
              connected ? <Navigate to="/chat" replace /> : <Connection />
            }
          />
          <Route
            path="/chat"
            element={connected ? <Chat /> : <Navigate to="/login" replace />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

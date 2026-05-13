import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import { ErrorBoundary } from '../components/ErrorBoundary';
import Home from '../pages/Home';
import Login from '../pages/Login/Login';
import RecoverPassword from '../pages/RecoverPassword/RecoverPassword';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import Foros from '../pages/Foros';
import Layout from '../components/layout/Layout';

export default function AppRoutes() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/recover-password" element={<RecoverPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Rutas protegidas con layout */}
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/home" element={<Home />} />
              <Route path="/foros" element={<Foros />} />
              <Route path="/" element={<Navigate to="/home" replace />} />
              {/* Aquí irán más rutas protegidas */}
            </Route>

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

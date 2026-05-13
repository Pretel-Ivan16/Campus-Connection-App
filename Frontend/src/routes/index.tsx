import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { ErrorBoundary } from '../components/ErrorBoundary';
import Home from '../pages/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import VerifyEmail from '../pages/VerifyEmail/VerifyEmail';
import VerifyEmailPending from '../pages/VerifyEmailPending';
import RecoverPassword from '../pages/RecoverPassword/RecoverPassword';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import Foros from '../pages/Foros';
import Faculties from '../pages/Faculties/Faculties';
import FacultyDetail from '../pages/Faculties/FacultyDetail';
import Layout from '../components/layout/Layout';

export default function AppRoutes() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/verify-email-pending" element={<VerifyEmailPending />} />
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

          {/* Rutas públicas con layout (sin autenticación requerida) */}
          <Route element={<Layout />}>
            <Route path="/facultades" element={<Faculties />} />
            <Route path="/facultades/:id" element={<FacultyDetail />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

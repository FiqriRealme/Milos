import { createBrowserRouter, Navigate } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import SellTransactionPage from './pages/SellTransactionPage';
import HistoryPage from './pages/HistoryPage';
import PointsPage from './pages/PointsPage';
import RewardsPage from './pages/RewardsPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import SchedulesPage from './pages/admin/SchedulesPage';
import WasteTypesPage from './pages/admin/WasteTypesPage';
import TransactionsPage from './pages/admin/TransactionsPage';
import AdminRewardsPage from './pages/admin/AdminRewardsPage';
import AdminRedemptionsPage from './pages/admin/AdminRedemptionsPage';

export const router = createBrowserRouter([
  // Public routes
  {
    path: '/',
    element: (
      <AuthProvider>
        <LandingPage />
      </AuthProvider>
    ),
  },
  {
    path: '/login',
    element: (
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    ),
  },
  {
    path: '/register',
    element: (
      <AuthProvider>
        <RegisterPage />
      </AuthProvider>
    ),
  },

  // Nasabah routes (protected)
  {
    path: '/dashboard',
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="nasabah">
          <Dashboard />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: '/sell',
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="nasabah">
          <SellTransactionPage />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: '/history',
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="nasabah">
          <HistoryPage />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: '/points',
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="nasabah">
          <PointsPage />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: '/rewards',
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="nasabah">
          <RewardsPage />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },

  // Admin routes (protected)
  {
    path: '/admin',
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: '/admin/schedules',
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="admin">
          <SchedulesPage />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: '/admin/waste-types',
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="admin">
          <WasteTypesPage />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: '/admin/transactions',
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="admin">
          <TransactionsPage />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: '/admin/rewards',
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="admin">
          <AdminRewardsPage />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: '/admin/redemptions',
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="admin">
          <AdminRedemptionsPage />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },

  // Fallback
  {
    path: '*',
    element: (
      <AuthProvider>
        <Navigate to="/" replace />
      </AuthProvider>
    ),
  },
]);
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Home from './pages/Home';
import DeviceList from './pages/devices/DeviceList';
import DeviceDetail from './pages/devices/DeviceDetail';
import AddDevice from './pages/devices/AddDevice';
import Profile from './pages/profile/Profile';
import Settings from './pages/settings/Settings';
import NotFound from './pages/NotFound';

// Layout components
import AppLayout from './components/layouts/AppLayout';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected app routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <AppLayout>
                  <Home />
                </AppLayout>
              </ProtectedRoute>
            } />

            <Route path="/devices" element={
              <ProtectedRoute>
                <AppLayout>
                  <DeviceList />
                </AppLayout>
              </ProtectedRoute>
            } />

            <Route path="/devices/:id" element={
              <ProtectedRoute>
                <AppLayout>
                  <DeviceDetail />
                </AppLayout>
              </ProtectedRoute>
            } />

            <Route path="/devices/add" element={
              <ProtectedRoute>
                <AppLayout>
                  <AddDevice />
                </AppLayout>
              </ProtectedRoute>
            } />

            <Route path="/profile" element={
              <ProtectedRoute>
                <AppLayout>
                  <Profile />
                </AppLayout>
              </ProtectedRoute>
            } />

            <Route path="/settings" element={
              <ProtectedRoute>
                <AppLayout>
                  <Settings />
                </AppLayout>
              </ProtectedRoute>
            } />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
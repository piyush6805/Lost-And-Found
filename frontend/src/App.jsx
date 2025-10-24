import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from './apiCalls/authApi';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  const dispatch = useDispatch();
  // We need 'loading' for the global loading check
  const { token, loading } = useSelector((state) => state.auth);

  // This hook now runs on EVERY app load
  useEffect(() => {
    // If we have a token (from localStorage), try to fetch the user's profile
    if (token) {
      getUserProfile(dispatch, token);
    }
  }, [token, dispatch]); // Runs once when token is loaded

  // This check prevents the app from "flickering"
  // It shows a loading screen only on the initial profile fetch
  if (loading && token) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        Loading...
      </div>
    );
  }

  // Once loading is false, or if there's no token, render the app
  return (
    <>
      <Header />
      <main style={{ padding: '1rem' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
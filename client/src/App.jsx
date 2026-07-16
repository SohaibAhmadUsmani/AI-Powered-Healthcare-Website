import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import OAuthCallback from "./pages/auth/OAuthCallback";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SplashScreen from "./components/splash/SplashScreen";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const isOAuthCallback = window.location.pathname === "/auth/oauth/callback";
  const [appReady, setAppReady] = useState(isOAuthCallback);

  const handleSplashFinish = useCallback(() => {
    window.history.replaceState(null, "", "/");
    setAppReady(true);
  }, []);

  if (!appReady) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: "10px",
              background: "#0F172A",
              color: "#FFFFFF",
              fontSize: "0.875rem",
              fontWeight: 500,
              boxShadow:
                "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
            },
            success: {
              iconTheme: { primary: "#16A34A", secondary: "#FFFFFF" },
            },
            error: {
              iconTheme: { primary: "#DC2626", secondary: "#FFFFFF" },
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignupPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/auth/reset-password/:token" element={<ResetPasswordPage />} />
          </Route>
          <Route path="/auth/oauth/callback" element={<OAuthCallback />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

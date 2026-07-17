import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      const accessToken = searchParams.get("accessToken");
      const refreshToken = searchParams.get("refreshToken");

      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        try {
          const response = await api.get("/auth/me");
          const { user } = response.data.data;
          login(user, accessToken, refreshToken);
          navigate("/dashboard", { replace: true });
        } catch {
          setError("Failed to fetch user details.");
        }
      } else if (searchParams.get("error")) {
        setError(searchParams.get("error"));
      } else {
        setError("Invalid OAuth response.");
      }
    };

    handleCallback();
  }, [searchParams, navigate, login]);

  if (error) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0B0F19",
        color: "#DC2626",
        fontFamily: "'Inter', sans-serif",
        flexDirection: "column",
        gap: "16px",
        padding: "24px",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "1rem", color: "#94A3B8" }}>
          {error}
        </p>
        <button
          onClick={() => navigate("/auth/login", { replace: true })}
          style={{
            padding: "10px 24px",
            borderRadius: "10px",
            border: "1px solid rgba(6,182,212,0.2)",
            background: "rgba(6,182,212,0.1)",
            color: "#06B6D4",
            fontSize: "0.9rem",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#0B0F19",
      color: "#94A3B8",
      fontFamily: "'Inter', sans-serif",
      fontSize: "1rem",
    }}>
      Signing you in...
    </div>
  );
};

export default OAuthCallback;

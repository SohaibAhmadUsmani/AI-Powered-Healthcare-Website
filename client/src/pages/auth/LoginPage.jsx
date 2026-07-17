import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuthActions } from "../../hooks/useAuth";
import AuthCard from "../../components/auth/AuthCard";
import InputField from "../../components/common/InputField";
import PasswordInput from "../../components/common/PasswordInput";
import LoadingButton from "../../components/common/LoadingButton";
import OAuthButtons from "../../components/auth/OAuthButtons";
import AuthFooter from "../../components/auth/AuthFooter";

const loginSchema = z.object({
  email: z.string({ message: "Email is required" }).email("Invalid email address"),
  password: z.string({ message: "Password is required" }).min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthActions();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = async (data) => {
    const result = await login(data.email, data.password, data.rememberMe);
    if (result.success) {
      navigate("/dashboard", { replace: true });
    } else {
      setError("root", { message: result.message });
    }
  };

  return (
    <AuthCard title="Welcome back" subtitle="Sign in to your account to continue">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          register={register}
          error={errors.email}
          autoComplete="email"
        />
        <PasswordInput
          label="Password"
          name="password"
          placeholder="Enter your password"
          register={register}
          error={errors.password}
          autoComplete="current-password"
        />

        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <Link
            to="/auth/forgot-password"
            style={{
              color: "#06B6D4",
              fontSize: "0.85rem",
              fontWeight: 500,
              textDecoration: "none",
              fontFamily: "'Inter', sans-serif",
              transition: "color 200ms ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#22D3EE")}
            onMouseLeave={(e) => (e.target.style.color = "#06B6D4")}
          >
            Forgot password?
          </Link>
        </div>

        {errors.root && (
          <p style={{ color: "#DC2626", fontSize: "0.85rem", marginBottom: "12px", textAlign: "center", fontFamily: "'Inter', sans-serif" }}>
            {errors.root.message}
          </p>
        )}

        <LoadingButton isLoading={isLoading}>
          Sign In
        </LoadingButton>
      </form>

      <OAuthButtons />

      <AuthFooter
        text="Don't have an account?"
        linkText="Create one"
        linkTo="/auth/signup"
      />
    </AuthCard>
  );
};

export default LoginPage;

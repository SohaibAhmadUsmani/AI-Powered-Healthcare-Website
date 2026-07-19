import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuthActions } from "../../hooks/useAuth";
import AuthCard from "../../components/auth/AuthCard";
import InputField from "../../components/common/InputField";
import PasswordInput from "../../components/common/PasswordInput";
import LoadingButton from "../../components/common/LoadingButton";
import OAuthButtons from "../../components/auth/OAuthButtons";
import AuthFooter from "../../components/auth/AuthFooter";

const signupSchema = z.object({
  fullName: z.string({ message: "Full name is required" }).min(2, "Name must be at least 2 characters").max(50, "Name must not exceed 50 characters"),
  email: z.string({ message: "Email is required" }).email("Invalid email address"),
  password: z.string({ message: "Password is required" }).min(8, "Password must be at least 8 characters"),
});

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuthActions();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", password: "" },
  });

  const onSubmit = async (data) => {
    const result = await signup(data.fullName, data.email, data.password);
    if (result.success) {
      navigate("/", { replace: true });
    } else {
      setError("root", { message: result.message });
    }
  };

  return (
    <AuthCard title="Create account" subtitle="Get started with your free account">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputField
          label="Full Name"
          name="fullName"
          type="text"
          placeholder="John Doe"
          register={register}
          error={errors.fullName}
          autoComplete="name"
        />
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
          placeholder="Create a strong password"
          register={register}
          error={errors.password}
          autoComplete="new-password"
        />

        {errors.root && (
          <p style={{ color: "#DC2626", fontSize: "0.85rem", marginBottom: "12px", textAlign: "center", fontFamily: "'Inter', sans-serif" }}>
            {errors.root.message}
          </p>
        )}

        <LoadingButton isLoading={isLoading}>
          Create Account
        </LoadingButton>
      </form>

      <OAuthButtons />

      <AuthFooter
        text="Already have an account?"
        linkText="Sign in"
        linkTo="/auth/login"
      />
    </AuthCard>
  );
};

export default SignupPage;

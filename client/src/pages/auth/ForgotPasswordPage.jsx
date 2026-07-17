import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import api from "../../services/api";
import AuthCard from "../../components/auth/AuthCard";
import InputField from "../../components/common/InputField";
import LoadingButton from "../../components/common/LoadingButton";
import AuthFooter from "../../components/auth/AuthFooter";

const forgotSchema = z.object({
  email: z.string({ message: "Email is required" }).email("Invalid email address"),
});

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await api.post("/auth/forgot-password", { email: data.email });
      setEmailSent(true);
      toast.success("Reset link sent if the account exists.");
    } catch {
      setEmailSent(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <AuthCard title="Check your email" subtitle="If an account with that email exists, we've sent a password reset link.">
        <AuthFooter text="Remember your password?" linkText="Sign in" linkTo="/auth/login" />
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Reset password" subtitle="Enter your email and we'll send you a reset link">
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

        <LoadingButton isLoading={isLoading}>
          Send Reset Link
        </LoadingButton>
      </form>

      <AuthFooter text="Remember your password?" linkText="Sign in" linkTo="/auth/login" />
    </AuthCard>
  );
};

export default ForgotPasswordPage;

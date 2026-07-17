import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import AuthCard from "../../components/auth/AuthCard";
import PasswordInput from "../../components/common/PasswordInput";
import LoadingButton from "../../components/common/LoadingButton";
import AuthFooter from "../../components/auth/AuthFooter";

const resetSchema = z.object({
  password: z.string({ message: "Password is required" }).min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string({ message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await api.post(`/auth/reset-password/${token}`, { password: data.password });
      setResetDone(true);
      toast.success("Password reset successfully!");
    } catch (error) {
      setError("root", {
        message: error.response?.data?.message || "Failed to reset password. The link may have expired.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (resetDone) {
    return (
      <AuthCard title="Password reset" subtitle="Your password has been reset successfully. You can now sign in with your new password.">
        <AuthFooter text="Go to" linkText="Sign in" linkTo="/auth/login" />
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Set new password" subtitle="Enter your new password below">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <PasswordInput
          label="New Password"
          name="password"
          placeholder="Enter new password"
          register={register}
          error={errors.password}
          autoComplete="new-password"
        />
        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm new password"
          register={register}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        {errors.root && (
          <p style={{ color: "#DC2626", fontSize: "0.85rem", marginBottom: "12px", textAlign: "center", fontFamily: "'Inter', sans-serif" }}>
            {errors.root.message}
          </p>
        )}

        <LoadingButton isLoading={isLoading}>
          Reset Password
        </LoadingButton>
      </form>
    </AuthCard>
  );
};

export default ResetPasswordPage;

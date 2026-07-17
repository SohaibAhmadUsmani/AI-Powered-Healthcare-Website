import { useMemo } from "react";
import { motion } from "framer-motion";

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  helperText,
  disabled = false,
  autoComplete,
}) => {
  const hasError = !!error;
  const id = useMemo(() => name, [name]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      style={{ marginBottom: "18px" }}
    >
      {label && (
        <label
          htmlFor={id}
          style={{
            display: "block",
            fontSize: "0.85rem",
            fontWeight: 500,
            color: "#94A3B8",
            marginBottom: "6px",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          {...register(name)}
          style={{
            width: "100%",
            padding: "12px 14px",
            fontSize: "0.9375rem",
            fontFamily: "'Inter', sans-serif",
            border: `1.5px solid ${hasError ? "rgba(220,38,38,0.5)" : "rgba(6,182,212,0.12)"}`,
            borderRadius: "10px",
            outline: "none",
            backgroundColor: "rgba(17,24,39,0.8)",
            color: "#FFFFFF",
            transition: "border-color 250ms ease, box-shadow 250ms ease, background-color 250ms ease",
            boxShadow: hasError
              ? "0 0 0 3px rgba(220,38,38,0.08)"
              : "0 0 0 0px rgba(6,182,212,0)",
            caretColor: "#06B6D4",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = hasError ? "rgba(220,38,38,0.6)" : "rgba(6,182,212,0.4)";
            e.target.style.backgroundColor = "rgba(17,24,39,0.95)";
            e.target.style.boxShadow = hasError
              ? "0 0 0 3px rgba(220,38,38,0.12)"
              : "0 0 0 3px rgba(6,182,212,0.06)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = hasError ? "rgba(220,38,38,0.5)" : "rgba(6,182,212,0.12)";
            e.target.style.backgroundColor = "rgba(17,24,39,0.8)";
            e.target.style.boxShadow = hasError
              ? "0 0 0 3px rgba(220,38,38,0.08)"
              : "0 0 0 0px rgba(6,182,212,0)";
          }}
        />
      </div>
      {hasError && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: "0.8rem",
            color: "#DC2626",
            marginTop: "5px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error.message}
        </motion.p>
      )}
      {helperText && !hasError && (
        <p
          style={{
            fontSize: "0.8rem",
            color: "#475569",
            marginTop: "5px",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {helperText}
        </p>
      )}
    </motion.div>
  );
};

export default InputField;

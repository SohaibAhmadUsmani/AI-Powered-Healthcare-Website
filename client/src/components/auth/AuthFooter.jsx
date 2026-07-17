import { Link } from "react-router-dom";

const AuthFooter = ({ text, linkText, linkTo }) => {
  return (
    <p
      style={{
        textAlign: "center",
        fontSize: "0.875rem",
        color: "#64748B",
        marginTop: "24px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {text}{" "}
      <Link
        to={linkTo}
        style={{
          color: "#06B6D4",
          fontWeight: 600,
          textDecoration: "none",
          transition: "color 200ms ease, text-shadow 200ms ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.color = "#22D3EE";
          e.target.style.textShadow = "0 0 12px rgba(6,182,212,0.3)";
        }}
        onMouseLeave={(e) => {
          e.target.style.color = "#06B6D4";
          e.target.style.textShadow = "none";
        }}
      >
        {linkText}
      </Link>
    </p>
  );
};

export default AuthFooter;

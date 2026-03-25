const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles = {
    padding: "0.6rem 1.2rem",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  };

  const variants = {
    primary: {
      backgroundColor: "var(--accent)",
      color: "white",
    },
    secondary: {
      backgroundColor: "var(--social-bg)",
      color: "var(--text-h)",
    },
    danger: {
      backgroundColor: "#dc3545",
      color: "white",
    },
    success: {
      backgroundColor: "#198754",
      color: "white",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "var(--text)",
      padding: "0.4rem 0.8rem",
    },
  };

  const style = { ...baseStyles, ...variants[variant] };

  return (
    <button
      onClick={onClick}
      style={style}
      className={`btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

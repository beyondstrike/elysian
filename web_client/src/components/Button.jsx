const Button = ({ variant, className, children, disabled, ...props }) => {
  const getVariant = () => {
    switch (variant) {
      case "text":
        return `text-primary font-semibold disabled:opacity-40 ${
          disabled ? "" : "hover:text-secondary"
        } ${className}`;
      case "contained":
        return `px-4 py-2 w-full rounded-full bg-primary text-white disabled:opacity-40 ${
          disabled ? "" : "hover:bg-secondary"
        } ${className}`;
      case "outlined":
        return `px-4 py-2 w-full ring-1 ring-primary rounded-full bg-white font-semibold text-primary disabled:opacity-40 ${
          disabled ? "" : "hover:bg-muted"
        } ${className}`;
      default:
        return `px-4 py-2 w-full rounded-full bg-primary text-white disabled:opacity-40 ${
          disabled ? "" : "hover:bg-secondary"
        } ${className}`;
    }
  };

  return (
    <button
      {...props}
      disabled={disabled}
      className={`focus:outline-none ${getVariant()}`}
    >
      {children}
    </button>
  );
};

export default Button;

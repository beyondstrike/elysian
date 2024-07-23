import { Text, TouchableOpacity } from "react-native";
import React from "react";

const Button = ({
  variant,
  className,
  textClassName,
  children,
  disabled,
  ...props
}) => {
  const getVariant = () => {
    switch (variant) {
      case "text":
        return `${disabled ? "opacity-40" : "opacity-100"} ${className}`;
      case "contained":
        return `px-4 py-2 w-full rounded-full bg-primary ${
          disabled ? "opacity-40" : "opacity-100"
        } ${className}`;
      case "outlined":
        return `px-4 py-2 w-full border border-primary rounded-full bg-white font-semibold ${
          disabled ? "opacity-40" : "opacity-100"
        } ${className}`;
      default:
        return `px-4 py-2 w-full rounded-full bg-primary ${
          disabled ? "opacity-40" : "opacity-100"
        } ${className}`;
    }
  };

  return (
    <TouchableOpacity {...props} disabled={disabled} className={getVariant()}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;

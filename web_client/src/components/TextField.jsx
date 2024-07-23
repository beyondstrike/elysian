import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const TextField = ({ icon, className, type, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  return (
    <div className="relative">
      {icon || null}
      <input
        type={inputType}
        {...props}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-background ${
          icon ? "pl-10" : ""
        } ${type === "password" ? "pr-10" : ""} ${className}`}
      />
      {type === "password" && (
        <div
          className="absolute right-2 top-2 cursor-pointer"
          onClick={() => {
            setShowPassword(!showPassword);
            setInputType(showPassword ? "password" : "text");
          }}
        >
          {showPassword ? (
            <VisibilityOffIcon className="text-gray-500" />
          ) : (
            <VisibilityIcon className="text-gray-500" />
          )}
        </div>
      )}
    </div>
  );
};

export default TextField;

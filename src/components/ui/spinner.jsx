import React from "react";

export const Spinner = ({ size = "sm", className = "" }) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div
      className={`animate-spin rounded-full border-2 border-transparent border-t-current ${sizes[size]} ${className}`}
    ></div>
  );
};

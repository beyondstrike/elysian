import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function SecuredRoute({ children, requireAuth }) {
  const { user } = useUser();

  if (requireAuth && !user) {
    return <Navigate to="/login" />;
  }

  if (!requireAuth && user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default SecuredRoute;

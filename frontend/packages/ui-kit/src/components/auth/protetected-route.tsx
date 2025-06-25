import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "@tanstack/react-router";
import * as React from "react";
import { Spinner } from "../ui/spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, error, loginWithRedirect } = useAuth0();

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Oops... {error.message}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

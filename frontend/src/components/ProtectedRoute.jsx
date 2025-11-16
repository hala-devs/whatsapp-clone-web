import { userStore } from "../lips/state";
import { Navigate } from "react-router-dom";
import React from "react";

export default function ProtectedRoute(props) {
  const { token } = userStore();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, [token]);

  if (loading) return <div>Loading...</div>;

  if (token) return props.children;
  else return <Navigate to="/login" />;
}
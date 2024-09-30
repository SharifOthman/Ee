import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookie from "cookie-universal";

export default function RequireAuth() {
  const cookie = Cookie();
  const role = cookie.get("role");

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'admin') {
      window.location.pathname = `/`;
    }
  }, [role, navigate]);

  return (
    role === 'admin' ? <Outlet /> : null
  );
}

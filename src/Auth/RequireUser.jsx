import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookie from "cookie-universal";

export default function RequireUser() {
  const cookie = Cookie();
  const role = cookie.get("role");

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'user') {
      window.location.pathname = `/`;
    }
  }, [role, navigate]);

  return (
    role === 'user' ? <Outlet /> : null
  );
}

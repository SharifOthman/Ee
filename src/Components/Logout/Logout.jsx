import React from 'react';
import Cookies from 'cookie-universal';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const { t } = useTranslation();
  const nav = useNavigate();

  const cookies = Cookies();

  const handleLogout = () => {
    cookies.remove("token");
    cookies.remove("name");
    cookies.remove("email");
    cookies.remove("image");
    cookies.remove("role");
    cookies.remove("id");

    try {
      localStorage.setItem('logoutNotification', 'true');
      console.log('Notification set in localStorage');
    } catch (error) {
      console.error('Error setting notification in localStorage:', error);
    }

    nav('/')
  };

  return (
    <>
      <ToastContainer />
      <button className="btn rounded-pill main-btn" onClick={handleLogout}>
        {t("Logout")}
      </button>
    </>
  );
}

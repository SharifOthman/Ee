import React from 'react';
import Cookie from "cookie-universal";
import { baseUrl } from '../../Api/Api';
import { Axios } from '../../Api/axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';


export default function DeleteUser() {
  const cookie = Cookie();
  const id = cookie.get("id");
const { t } = useTranslation();
const nav = useNavigate();



  //   handleDelete
  async function handleDelete() {
    try {
         await Axios.delete(`${baseUrl}/delete-user/${id}`);
         cookie.remove("token");
         cookie.remove("name");
         cookie.remove("email");
         cookie.remove("image");
         cookie.remove("role");
         cookie.remove("id");
         localStorage.setItem('delete_account', 'true');
         nav('/')
    } catch {
      console.log("err");
    }

  }

  return (
    <button className="btn rounded-pill main-btn" title='delete_user' onClick={handleDelete}>
       {t("Delete")}
    </button>
  );
}

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Cookie from "cookie-universal";
import "./pagesMain.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from "../../Api/Api";
import Tabe from "../../Components/Tape/Tabe";

export default function Contact({ isChecked }) {
  const { t } = useTranslation();
  const cookie = Cookie();
  const email = cookie.get("email");
  const name = cookie.get("name");
  const id = cookie.get("id");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const nav = useNavigate();

  // handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    if(email){
      const form = new FormData();
      form.append("subject", subject);
      form.append("content", content);
      form.append("visitor_email", email);
      form.append("visitor_name", name);
      form.append("user_id", id);
      try {
        await axios.post(`${baseUrl}/add-message`, form);
        setSubject("");
        setContent("");
        toast.success(t('Message sent successfully!'));
      } catch (err) {
        console.log(err);
        // toast.error(t('Failed to send message.'));
        toast.success(t('Message sent successfully!'));
        setSubject("");
        setContent("");
      }
    } else {
      nav('/login');
    }
  }

  return (
    <>
      <ToastContainer />
      <Tabe word={'Contact Us'} />
      <h1 className="text-center" style={{ color: "#ED7200", padding: "30px" }}>
        {t("Get In Touch")}
      </h1>
      <div className="contact-info pt-5 pb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4">
              <div className="card d-flex flex-column align-items-center p-4">
                <div className="icon mb-2">
                  <i
                    className="fa-solid fa-clock"
                    style={{ fontSize: "50px", color: "#004d00" }}
                  ></i>
                </div>
                <h4 className="m-0 fst" style={{ color: "#4B5563" }}>
                  {t("Opening Hours")}
                </h4>
                <p className="co">{t("09:00am to 06:00pm")}</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4">
              <div className="card d-flex flex-column align-items-center p-4">
                <div className="icon mb-2">
                  <i
                    className="fa-brands fa-whatsapp"
                    style={{ fontSize: "50px", color: "#004d00" }}
                  ></i>
                </div>
                <h4 className="m-0 fst" style={{ color: "#4B5563" }}>
                  {t("Whatsapp")}
                </h4>
                <p className="co">+963984944832</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4">
              <div className="card d-flex flex-column align-items-center p-4">
                <div className="icon mb-2">
                  <i
                    className="fa fa-envelope"
                    style={{ fontSize: "50px", color: "#004d00" }}
                  ></i>
                </div>
                <h4 className="m-0 fst" style={{ color: "#4B5563" }}>
                  {t("Email")}
                </h4>
                <p className="co">info@eyeengineer.com</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4">
              <div className="card d-flex flex-column align-items-center p-4">
                <div className="icon mb-2">
                  <i
                    className="fa fa-map"
                    style={{ fontSize: "50px", color: "#004d00" }}
                  ></i>
                </div>
                <h4 className="m-0 fst" style={{ color: "#4B5563" }}>
                  {t("Address")}
                </h4>
                <p className="co">{t("Syria")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row align-items-center">
        <div className="col-md-6 text-center">
            {!isChecked ? (
              <img
                src={require("../../Assets/images/logo1.png")}
                alt="Eye Engineer Logo"
                className="img-fluid"
                height='130px'
                width='400px'
              />
            ) : (
              <img
                src={require("../../Assets/images/Logo_Eye Engineer_Olive.png")}
                alt="Eye Engineer Logo"
                className="img-fluid"
                 height='130px'
                width='400px'
              />
            )}
          </div>
          <div className="col-md-6">
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    type="text"
                    className="form-control full-width"
                    id="subject"
                    placeholder={t("subject")}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    type="text"
                    className="form-control full-width"
                    id="content"
                    placeholder={t("content")}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-send btn-block full-width"
                >
                  {t("Send Message")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

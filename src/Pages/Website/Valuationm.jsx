import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./pagesMain.css";
import axios from "axios";
import { baseUrl } from "../../Api/Api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Valuationm({isChecked}) {
  const { t } = useTranslation();
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [contact_phone, setPhone] = useState("");

  // handle Submit
  async function handleSubmit(e) {
    e.preventDefault();

    const form = new FormData();
    form.append("subject", subject);
    form.append("content", content);
    form.append("contact_phone", contact_phone);
    try {
      await axios.post(`${baseUrl}/add-valuation`, form);
      setContent('');
      setPhone('');
      setSubject('');
      toast.success(t('Message sent successfully!'));
    } catch (err) {
      console.log(err);
      toast.error(t('Failed to send message.'));
    }
  }

  return (
    <>
      <ToastContainer />
      <h1
        className="text-center"
        style={{ color: "white", padding: "30px", backgroundColor: "#ED7200" }}
      >
        {t("valuation_title")}
      </h1>
      <h1 className="text-center" style={{ color: "#ED7200", padding: "30px" }}>
        {t("valuation_d")}
      </h1>
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
                <div className="form-group">
                  <input
                    value={contact_phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    className="form-control full-width"
                    id="contact_phone"
                    placeholder={t("contact_phone")}
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

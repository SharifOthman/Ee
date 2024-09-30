import { useTranslation } from "react-i18next";
import Content from "../../Components/Website/Content/Content";
import Slider from "../../Components/Website/Slider/Slider";
import News from "../../Components/News/News";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import NavBar from "../../Components/Website/NavBar/NavBar";
import Footer from "../../Components/Website/Footer/Footer";
import Tabe from "../../Components/Tape/Tabe";

export default function Home({ isChecked, handleToggle }) {
  useEffect(() => {
    const notification = localStorage.getItem("logoutNotification");
    const da = localStorage.getItem("delete_account");
    const su = localStorage.getItem("SignUp");
    const li = localStorage.getItem("login");


    if (notification === "true") {
      toast.success(t("Logged out successfully"));

      setTimeout(() => {
        localStorage.removeItem("logoutNotification");
      }, 100);
    }
    if (da === "true") {
      toast.success(t("Account deleted successfully"));

      setTimeout(() => {
        localStorage.removeItem("delete_account");
      }, 100);
    }
    if (su === "true") {
      toast.success(t("Account successfully created"));

      setTimeout(() => {
        localStorage.removeItem("SignUp");
      }, 100);
    }
    if (li === "true") {
        toast.success(t("logged in successfully"));
  
        setTimeout(() => {
          localStorage.removeItem("login");
        }, 100);
      }
  }, []);

  const { t } = useTranslation();

  return (
    <>
      <ToastContainer />
      <NavBar isChecked={isChecked} handleToggle={handleToggle} />
      <Slider />
      <News  isChecked={isChecked} />
       <Tabe word={'Services'} />
      <Content />
      <Footer isChecked={isChecked}/>
    </>
  );
}

import { NavLink } from "react-router-dom";
import "./bars.css";
import { useContext } from "react";
import { Menu } from "../../Context/MenuContext";
import { WindowSize } from "../../Context/WindowContext";
import { useTranslation } from "react-i18next";

export default function SideBar() {
  const menu = useContext(Menu);
  const windowContext = useContext(WindowSize);
  const isOpen = menu.isOpen;
  const setIsOpen = menu.setIsOpen;
  const windowSize = windowContext.windowSize;
  const { i18n } = useTranslation();
  console.log(i18n.resolvedLanguage)
  const lan = i18n.resolvedLanguage;

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);
  

  return (
    <div
       onMouseLeave={handleMouseLeave}
       onMouseEnter={handleMouseEnter}
      className="side-bar pt-3"
      
      style={{
        [lan === 'ar' ? 'right' : 'left']: windowSize < 1000 ? (isOpen ? 0 : "-100%") : 0,
        width: isOpen ? "240px" : "60px", 
      }}
    >
      {/* محتوى الـ SideBar */}
      <div className="scrolside">
        <NavLink
          to={"info"}
          className="d-flex align-items-center gap-2 side-bar-link"
        >
          <i
            className="fa-solid fa-display"
            style={{ padding: isOpen ? "10px 8px 10px 15px" : "10px 13px" }}
          ></i>
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
          {i18n.t("Dashboard")}
          </p>
        </NavLink>
        
        <NavLink
          to={"users"}
          className="d-flex align-items-center gap-2 side-bar-link"
        >
          <i
            className="fa-solid fa-users"
            style={{ padding: isOpen ? "10px 8px 10px 15px" : "10px 13px" }}
          ></i>
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
          {i18n.t("Users")}
        
          </p>
        </NavLink>
        <NavLink
          to={"slides"}
          className="d-flex align-items-center gap-2 side-bar-link"
        >
          <i
            className="fa-solid fa-images"
            style={{ padding: isOpen ? "10px 8px 10px 15px" : "10px 13px" }}
          ></i>
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
          {i18n.t("Slides")}
          </p>
        </NavLink>
        <NavLink
          to={"news"}
          className="d-flex align-items-center gap-2 side-bar-link"
        >
          <i
            className="fa-solid fa-newspaper"
            style={{ padding: isOpen ? "10px 8px 10px 15px" : "10px 13px" }}
          ></i>
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
          {i18n.t("News")}
        
          </p>
        </NavLink>
        <hr style={{color:'#ED7200'}} />
        <NavLink
          to={"geometries"}
          className="d-flex align-items-center gap-1 side-bar-link"
        >
          <i style={{ padding: isOpen ? "2px 8px 2px 5px" : "10px 10px 0 5px" }}>
            <img
              className="text-center"
              src={require("../../Assets/images/DARK GREEN/هندسة-زيتي.png")}
              alt=""
              width={"35px"}
              height={"35px"}
            />
          </i>
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
          {i18n.t("Geometries")}
        
          </p>
        </NavLink>
        <NavLink
          to={"educational_videos"}
          className="d-flex align-items-center gap-1 side-bar-link"
        >
          <i style={{ padding: isOpen ? "2px 8px 2px 5px" : "1px 10px 0 5px" }}>
            <img
              className="text-center"
              src={require("../../Assets/images/DARK GREEN/فيديوهات تعليمية-زيتي.png")}
              alt=""
              width={"35px"}
              height={"35px"}
            />
          </i>
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
          {i18n.t("Educational Videos")}
        
          </p>
        </NavLink>
        {/* <NavLink
          to={"articles"}
          className="d-flex align-items-center gap-1 side-bar-link"
        >
          <i style={{ padding: isOpen ? "2px 8px 2px 5px" : "1px 10px 0 5px" }}>
            <img
              className="text-center"
              src={require("../../Assets/images/DARK GREEN/مقالات هندسية-زيتي.png")}
              alt=""
              width={"35px"}
              height={"35px"}
            />
          </i>
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
            Engineering Articles
          </p>
        </NavLink> */}
        <NavLink
          to={"recents"}
          className="d-flex align-items-center gap-1 side-bar-link"
        >
          <i style={{ padding: isOpen ? "2px 8px 2px 5px" : "1px 10px 0 5px" }}>
            <img
              className="text-center"
              src={require("../../Assets/images/DARK GREEN/إدارة مشاريع-زيتي.png")}
              alt=""
              width={"35px"}
              height={"35px"}
            />
          </i>
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
          {i18n.t("Recents")}
          </p>
        </NavLink>
        <NavLink
          to={"valuation"}
          className="d-flex align-items-center gap-2 side-bar-link"
        >
           <i style={{ padding: isOpen ? "2px 8px 2px 5px" : "1px 10px 0 5px" }}>
            <img
              className="text-center"
              src={require("../../Assets/images/DARK GREEN/تقييم عقاري-زيتي.png")}
              alt=""
              width={"35px"}
              height={"35px"}
            />
          </i>
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
          {i18n.t("Property Valuation")}
        
          </p>
        </NavLink>
        <NavLink
          to={"offices"}
          className="d-flex align-items-center gap-1 side-bar-link"
        >
          <i style={{ padding: isOpen ? "2px 8px 2px 5px" : "1px 10px 0 5px" }}>
            <img
              className="text-center"
              src={require("../../Assets/images/DARK GREEN/جديد-زيتي1.png")}
              alt=""
              width={"35px"}
              height={"35px"}
            />
          </i>
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
          {i18n.t("Offices")}
          </p>
        </NavLink>
        <NavLink
          to={"terminologies"}
          className="d-flex align-items-center gap-1 side-bar-link"
        >
          <i style={{ padding: isOpen ? "2px 8px 2px 5px" : "1px 10px 0 5px" }}>
            <img
              className="text-center"
              src={require("../../Assets/images/DARK GREEN/مصطلحات هندسية-زيتي.png")}
              alt=""
              width={"35px"}
              height={"35px"}
            />
          </i>
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
          {i18n.t("Terminologies")}
          </p>
        </NavLink>
        <hr style={{color:'#ED7200'}}/>
        <NavLink
          to={"reservations"}
          className="d-flex align-items-center gap-2 side-bar-link"
        >
          <i
            className="fa-solid fa-comments-dollar"
            style={{ padding: isOpen ? "10px 8px 10px 15px" : "10px 13px" }}
          ></i>
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
          {i18n.t("Reservations")}
        
          </p>
        </NavLink>
        <NavLink
          to={"messages"}
          className="d-flex align-items-center gap-2 side-bar-link"
        >
          <i
            className="fa-solid fa-comment"
            style={{ padding: isOpen ? "10px 8px 10px 15px" : "10px 13px" }}
          ></i>
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
          {i18n.t("Messages")}
          </p>
        </NavLink>
        <NavLink
          to={"services"}
          className="d-flex align-items-center gap-2 side-bar-link"
        >
          <i
            className="fa-solid fa-sliders"
            style={{ padding: isOpen ? "10px 8px 10px 15px" : "10px 13px" }}
          ></i>
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
          {i18n.t("services")}
          </p>
        </NavLink>
        <NavLink
          to={"change_email"}
          className="d-flex align-items-center gap-2 side-bar-link"
        >
          <i
            className="fa-solid fa-envelope"
            style={{ padding: isOpen ? "10px 8px 10px 15px" : "10px 13px" }}
          ></i>
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
          {i18n.t("Change Email")}
          </p>
        </NavLink> 
      </div>
      
    </div>
  );
}
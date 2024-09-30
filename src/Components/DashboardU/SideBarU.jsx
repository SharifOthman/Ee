import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { Menu } from "../../Context/MenuContext";
import { WindowSize } from "../../Context/WindowContext";
import { useTranslation } from "react-i18next";

export default function SideBarU() {
  const menu = useContext(Menu);
  const windowContext = useContext(WindowSize);
  const isOpen = menu.isOpen;
  const setIsOpen = menu.setIsOpen;
  const windowSize = windowContext.windowSize;

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  const { i18n } = useTranslation();
  console.log(i18n.resolvedLanguage)
  const lan = i18n.resolvedLanguage;
  

  return (
    <div
       onMouseLeave={handleMouseLeave}
       onMouseEnter={handleMouseEnter}
      className="side-bar pt-3"
      style={{
        [lan === 'en' ? 'left' : 'right']: windowSize < 1000 ? (isOpen ? 0 : "-100%") : 0,
        width: isOpen ? "240px" : "60px", // عرض ثابت عندما يكون مغلقًا
      }}
    >
     <NavLink
        to={"my-offices"}
        className="d-flex align-items-center gap-1 side-bar-link"
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
        {i18n.t("My Offices")} 
         
        </p>
      </NavLink>
      <NavLink
        to={"/offices"}
        className="d-flex align-items-center gap-2 side-bar-link"
      >
        <i
          className="fa-solid fa-blender-phone"
          style={{ padding: isOpen ? "10px 8px 10px 15px" : "10px 13px" }}
        ></i>
        <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
        {i18n.t("Reserve")} 

        
        </p>
      </NavLink>
     
     
 
     
    
      
    </div>
  );
}

import { useContext } from "react";
import { Menu } from "../../Context/MenuContext";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function TopBar() {
  const menu = useContext(Menu);
  const { i18n } = useTranslation();
  const setIsOpen = menu.setIsOpen;

  return (
    <div className="top-bar d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-5">
        <NavLink to={"/"}>
          <img
            width="150px"
            height="50px"
            src={require("../../Assets/images/logo1.png")}
            alt="logo"
          />
        </NavLink>

        <i
          className={"fa-solid fa-bars"}
          style={{ cursor: "pointer", fontSize: "25px", color: "#084B22" }}
          onClick={() => setIsOpen((prev) => !prev)}
        ></i>
      </div>
      <NavLink to={"/"} className="btn rounded-pill main-btn">
        {i18n.t("Home")}
      </NavLink>
    </div>
  );
}

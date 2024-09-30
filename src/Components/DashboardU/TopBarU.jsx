import { useContext } from "react"
import { Menu } from "../../Context/MenuContext"
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function TopBarU(){
    const menu = useContext(Menu)
    const setIsOpen = menu.setIsOpen;
    const { i18n } = useTranslation();


    return(
       <div className="top-bar d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-5">
        <NavLink to={'/'}>
            <img
                  width="150px"
                  height="50px"
                  src={require('../../Assets/images/logo1.png')}
                  alt="logo"
                />
        </NavLink>
        
            <i className={"fa-solid fa-bars"} style={{cursor:"pointer",fontSize:"25px",color:"#084B22"}} onClick={() => setIsOpen(prev => !prev)}></i>
        </div>
        <NavLink to={'/home'} className='btn rounded-pill main-btn'>
        {i18n.t("Home")}
        </NavLink>
       </div>
    )
}
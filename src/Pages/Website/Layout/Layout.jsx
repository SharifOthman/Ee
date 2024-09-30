import React from "react";
import NavBar from "../../../Components/Website/NavBar/NavBar";
import Footer from "../../../Components/Website/Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout= ({isChecked,handleToggle}) => {
  return (
    <>
      <NavBar isChecked={isChecked} handleToggle={handleToggle}/>
      <Outlet/>
      <Footer isChecked={isChecked} />
    </>
  );
};

export default Layout;


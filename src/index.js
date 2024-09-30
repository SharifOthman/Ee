import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import MenuContext from "./Context/MenuContext";
import WindowContext from "./Context/WindowContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 
    <WindowContext>
    <MenuContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MenuContext>
    </WindowContext>
);

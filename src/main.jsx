// import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import { MainApp } from "./useContext/MainApp.jsx";
import { BrowserRouter } from "react-router-dom";
import React from "react";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <MainApp />
    </React.StrictMode>
  </BrowserRouter>
);

import React, { createContext, useState } from "react";
import "./styles.css";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const myContext = createContext();
const MainContainer = () => {
  const lightTheme = useSelector((state) => state.themeKey);
  const [refresh, setRefresh] = useState(true);
  return (
    <div className={"main-container" + (lightTheme ? "" : " dark")}>
      <myContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }}>
        <SideBar />
        <Outlet />
      </myContext.Provider>
    </div>
  );
};

export default MainContainer;

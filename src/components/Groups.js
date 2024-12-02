import React from 'react'
import "./styles.css";
import logo from "../Images/chat-512.png";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from 'react-redux';

const Groups = () => {
  const lightTheme=useSelector((state)=>state.themeKey);
  return (
    <div className={"list-container"+((lightTheme)?"":" dark")}>
      <div className={"ug-header"+((lightTheme)?"":" dark")}>
        <img src={logo} style={{ height: "2rem", width: "2rem/" }} />
        <p className={"ug-title"+((lightTheme)?"":" dark")}>Awailable Groups</p>
      </div>
      <div className={"sb-search"+((lightTheme)?"":" dark")}>
        <IconButton>
          <SearchIcon className={"icon"+((lightTheme)?"":" dark")}/>
        </IconButton>
        <input placeholder="Search" className={"search-box"+((lightTheme)?"":" dark")} />
      </div>
      <div className={"ug-list"+((lightTheme)?"":" dark")}>
        <div className={"list-tem"+((lightTheme)?"":" dark")}>
          <p className={"con-icon"+((lightTheme)?"":" dark")}>T</p>
          <p className={"con-title"+((lightTheme)?"":" dark")}>Test Group</p>
        </div>
        <div className={"list-tem"+((lightTheme)?"":" dark")}>
          <p className={"con-icon"+((lightTheme)?"":" dark")}>T</p>
          <p className={"con-title"+((lightTheme)?"":" dark")}>Test Group</p>
        </div>
        <div className={"list-tem"+((lightTheme)?"":" dark")}>
          <p className={"con-icon"+((lightTheme)?"":" dark")}>T</p>
          <p className={"con-title"+((lightTheme)?"":" dark")}>Test Group</p>
        </div>
        <div className={"list-tem"+((lightTheme)?"":" dark")}>
          <p className={"con-icon"+((lightTheme)?"":" dark")}>T</p>
          <p className={"con-title"+((lightTheme)?"":" dark")}>Test Group</p>
        </div>
        <div className={"list-tem"+((lightTheme)?"":" dark")}>
          <p className={"con-icon"+((lightTheme)?"":" dark")}>T</p>
          <p className={"con-title"+((lightTheme)?"":" dark")}>Test Group</p>
        </div>
        <div className={"list-tem"+((lightTheme)?"":" dark")}>
          <p className={"con-icon"+((lightTheme)?"":" dark")}>T</p>
          <p className={"con-title"+((lightTheme)?"":" dark")}>Test Group</p>
        </div>
      </div>
    </div>
  )
}

export default Groups
import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LightModeIcon from "@mui/icons-material/LightMode";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SearchIcon from "@mui/icons-material/Search";
import ConversationItem from "./ConversationItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Features/themeSlice";
import axios from "../utils/axios";
import { refreshSidebarFun } from "../Features/refreshSidebar";
import { myContext } from "./MainContainer";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
  // console.log(lightTheme);
  const { refresh, setRefresh } = useContext(myContext);
  // console.log("Context API : refresh : ", refresh);
  const [conversations, setConversations] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  if (!userData) {
    console.log("User not Authenticated");
    navigate("/");
  }
  const user = userData.data;
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { data } = await axios.get("/chat/fetchChat");
        // console.log(data);
        setConversations(data);
      } catch (err) {
        alert(err.response.data.message);
      }
    };
    fetchConversations();
  }, [refresh]);

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get("/logout");
      console.log(data);
      sessionStorage.removeItem("userData");
      setRefresh(!refresh);
      navigate("/login");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className={"sidebar-container" + (lightTheme ? "" : " dark")}>
      <div className={"sb-header" + (lightTheme ? "" : " dark")}>
        <div className={"other-icon" + (lightTheme ? "" : " dark")}>
          <IconButton>
            <AccountCircleIcon
              className={"icon" + (lightTheme ? "" : " dark")}
            />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate("users");
            }}
          >
            <PersonAddAlt1Icon
              className={"icon" + (lightTheme ? "" : " dark")}
            />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate("groups");
            }}
          >
            <GroupAddIcon className={"icon" + (lightTheme ? "" : " dark")} />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate("create-groups");
            }}
          >
            <AddCircleIcon className={"icon" + (lightTheme ? "" : " dark")} />
          </IconButton>

          <IconButton
            onClick={() => {
              dispatch(toggleTheme());
            }}
          >
            {lightTheme && (
              <NightlightIcon
                className={"icon" + (lightTheme ? "" : " dark")}
              />
            )}
            {!lightTheme && (
              <LightModeIcon className={"icon" + (lightTheme ? "" : " dark")} />
            )}
          </IconButton>
          <IconButton onClick={logoutHandler}>
            <ExitToAppIcon className={"icon" + (lightTheme ? "" : " dark")} />
          </IconButton>
        </div>
      </div>
      {/* <div className={"sb-search" + (lightTheme ? "" : " dark")}>
        <IconButton>
          <SearchIcon className={"icon" + (lightTheme ? "" : " dark")} />
        </IconButton>
        <input
          placeholder="Search"
          className={"search-box" + (lightTheme ? "" : " dark")}
        />
      </div> */}
      <div className={"sb-conversation" + (lightTheme ? "" : " dark")}>
        {conversations.map((conversation, idx) => {
          return <ConversationItem props={conversation} key={idx} />;
        })}
      </div>
    </div>
  );
};

export default SideBar;

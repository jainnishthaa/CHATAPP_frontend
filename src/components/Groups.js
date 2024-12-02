import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import logo from "../Images/chat-512.png";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useDispatch, useSelector } from "react-redux";
import { myContext } from "./MainContainer";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const Groups = () => {
  const lightTheme = useSelector((state) => state.themeKey);
  const { refresh, setRefresh } = useContext(myContext);
  const [groups, setGroups] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const navigate = useNavigate();

  if (!userData) {
    console.log("User not Authenticated");
    navigate("/login");
  }

  const addGroup = async (group) => {
    console.log("Creating chat with ", group.chatName);
    try {
      const chatId = group._id;
      // console.log(otherUserId);
      const { data } = await axios.put("/chat/addSelfToGroup", {
        chatId: chatId,
        userId: userData._id,
      });
      console.log(data);
      setRefresh(!refresh);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    async function fetchGroups() {
      try {
        const { data } = await axios.get("/chat/fetchGroups");
        console.log(data);
        setGroups(data);
      } catch (err) {
        alert(err.response.data.message);
      }
    }
    fetchGroups();
  }, [refresh]);

  return (
    <div className={"list-container" + (lightTheme ? "" : " dark")}>
      <div className={"ug-header" + (lightTheme ? "" : " dark")}>
        <img src={logo} style={{ height: "2rem", width: "2rem/" }} />
        <p className={"ug-title" + (lightTheme ? "" : " dark")}>
          Awailable Groups
        </p>
        <IconButton
          className={"icon" + (lightTheme ? "" : " dark")}
          onClick={() => {
            setRefresh(!refresh);
          }}
        >
          <RefreshIcon />
        </IconButton>
      </div>
      {/* <div className={"sb-search"+((lightTheme)?"":" dark")}>
        <IconButton>
          <SearchIcon className={"icon"+((lightTheme)?"":" dark")}/>
        </IconButton>
        <input placeholder="Search" className={"search-box"+((lightTheme)?"":" dark")} />
      </div> */}
      <div className={"ug-list" + (lightTheme ? "" : " dark")}>
        {groups.map((group, index) => {
          return (
            <div className={"list-tem" + (lightTheme ? "" : " dark")} onClick={()=>{
              addGroup(group);
            }}>
              <p className={"con-icon" + (lightTheme ? "" : " dark")}>{group.chatName[0]}</p>
              <p className={"con-title" + (lightTheme ? "" : " dark")}>
                {group.chatName}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Groups;

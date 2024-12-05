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
import { refreshSidebarFun } from "../Features/refreshSidebar";

const Users = () => {
  const { refresh, setRefresh } = useContext(myContext);
  const lightTheme = useSelector((state) => state.themeKey);
  const [users, setUsers] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!userData) {
    console.log("User not Authenticated");
    navigate("/login");
  }

  const createChat=async (user)=>{
    // console.log("Creating chat with ", user.name);
    try{
      const otherUserId=user._id
      // console.log(otherUserId)
      const {data}=await axios.post("/chat/accessChat", {
        otherUserId:otherUserId,
      })
      // console.log(data)
      setRefresh(!refresh);
    }
    catch(err){
      alert(err.response.data.message);
    }
  }

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data } = await axios.get("/user/fetchUsers");
        // console.log(data);
        setUsers(data);
      } catch (err) {
        alert(err.response.data.message);
      }
    }
    fetchUsers();
  }, [refresh]);

  return (
    <div className={"list-container" + (lightTheme ? "" : " dark")}>
      <div className={"ug-header" + (lightTheme ? "" : " dark")}>
        <img src={logo} style={{ height: "2rem", width: "2rem/" }} />
        <p className={"ug-title" + (lightTheme ? "" : " dark")}>
          Available Users
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
        {users.map((user, idx) => {
          return (
            <div className={"list-tem" + (lightTheme ? "" : " dark")} onClick={()=>{
              createChat(user);
            }} key={idx}>
              <p className={"con-icon" + (lightTheme ? "" : " dark")}>{user.name[0]}</p>
              <p className={"con-title" + (lightTheme ? "" : " dark")}>
                {user.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;

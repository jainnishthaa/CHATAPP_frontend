import React from "react";
import "./styles.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ConversationItem = ({ props }) => {
  // console.log(props.latestMessage.content);
  const lightTheme = useSelector((state) => state.themeKey);
  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  let name = undefined;
  let latestMessage = undefined;
  let timeStamp = undefined;
  if (!props.isGroupChat) {
    // console.log(userData._id);
    const user = props.users.filter((user) => {
      if (user._id !== userData._id) {
        return user;
      }
    });
    name = user[0].name;
    // console.log(props.latestMessage);
    if (props.latestMessage) {
      latestMessage = props.latestMessage.content;
    }
  }

  if (props.isGroupChat) {
    name = props.chatName;
    if (props.latestMessage) {
      latestMessage = props.latestMessage.content;
    }
  }
  return (
    <div
      className={"conversation-container" + (lightTheme ? "" : " dark")}
      onClick={() => {
        navigate(`chat/${props._id}&${name}`);
      }}
    >
      <p className={"con-icon" + (lightTheme ? "" : " dark")}>{name[0]}</p>
      <p className={"con-title" + (lightTheme ? "" : " dark")}>{name}</p>
      <p className={'con-lastMessage'+((lightTheme)?"":" dark")}>{latestMessage}</p>
      <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
        {timeStamp}
      </p>
    </div>
  );
};

export default ConversationItem;

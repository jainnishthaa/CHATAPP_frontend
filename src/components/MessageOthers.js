import React from "react";
import "./styles.css";
import { useSelector } from "react-redux";

const MessageOthers = ({props}) => {
  const lightTheme=useSelector((state)=>state.themeKey);
  // console.log(props);
  // var props1 = { name: "RandomUser", message: "This is sample message" };
  return (
    <div className={"other-message-container"+((lightTheme)?"":" dark")}>
      <div className={"conversation-container"+((lightTheme)?"":" dark")}>
        <p className={"con-icon"+((lightTheme)?"":" dark")}>{props.sender.name[0]}</p>
        <div className={"other-text-content"+((lightTheme)?"":" dark")}>
          <p className={"con-title"+((lightTheme)?"":" dark")}>{props.sender.name}</p>
          <p className={"other-message-content"+((lightTheme)?"":" dark")}>{props.content}</p>
          {/* <p className={"self-timeStamp"+((lightTheme)?"":" dark")}>12:00am</p> */}
        </div>
      </div>
    </div>
  );
};

export default MessageOthers;

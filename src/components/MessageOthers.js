import React from "react";
import { useSelector } from "react-redux";

const MessageOthers = () => {
  const lightTheme=useSelector((state)=>state.themeKey);
  var props1 = { name: "RandomUser", message: "This is sample message" };
  return (
    <div className={"other-message-container"+((lightTheme)?"":" dark")}>
      <div className={"conversation-container"+((lightTheme)?"":" dark")}>
        <p className={"con-icon"+((lightTheme)?"":" dark")}>{props1.name[0]}</p>
        <div className={"other-text-content"+((lightTheme)?"":" dark")}>
          <p className={"con-title"+((lightTheme)?"":" dark")}>{props1.name}</p>
          <p className={"con-lastMessage"+((lightTheme)?"":" dark")}>{props1.message}</p>
          <p className={"self-timeStamp"+((lightTheme)?"":" dark")}>12:00am</p>
        </div>
      </div>
    </div>
  );
};

export default MessageOthers;

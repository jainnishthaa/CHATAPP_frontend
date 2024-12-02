import React from 'react'
import { useSelector } from 'react-redux';

const MessageSelf = () => {
  const lightTheme = useSelector((state)=>state.themeKey);
    var props2={name:"You",message:"This is sample message"};

  return (
    <div className={'self-message-container'+((lightTheme)?"":" dark")}>
        <div className={'messageBox'+((lightTheme)?"":" dark")}>
            <p>{props2.message}</p>
            <p className={"self-timeStamp"+((lightTheme)?"":" dark")}>12:00am</p>
        </div>
    </div>
  )
}

export default MessageSelf
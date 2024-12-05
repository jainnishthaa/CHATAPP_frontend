import React from 'react'
import "./styles.css";
import { useSelector } from 'react-redux';

const MessageSelf = ({props}) => {
  const lightTheme = useSelector((state)=>state.themeKey);
  // console.log(props)
    // var props2={name:"You",message:"This is sample message"};

  return (
    <div className={'self-message-container'+((lightTheme)?"":" dark")}>
        <div className={'messageBox'+((lightTheme)?"":" dark")}>
            <p>{props.content}</p>
            {/* <p className={"self-timeStamp"+((lightTheme)?"":" dark")}>12:00am</p> */}
        </div>
    </div>
  )
}

export default MessageSelf
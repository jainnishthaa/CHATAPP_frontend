import React from 'react'
import logo from "../Images/chat-512.png"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const lightTheme = useSelector((state)=>state.themeKey);
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  console.log(userData);
  const nav = useNavigate();
  if (!userData) {
    console.log("User not Authenticated");
    nav("/");
  }
  return (
    <div className={'welcome-container'+((lightTheme)?"":" dark")}>
        <img src={logo} alt="Logo" className={'welcome-logo'+((lightTheme)?"":" dark")}/>
        <h1>Start Chatting.....</h1>
    </div>
  )
}

export default Welcome
import React, { useRef } from "react";
import logo from "../Images/chat-512.png";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const Login = () => {
  const nameRef = useRef();
  const passwordRef = useRef();
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginHandler = async () => {
    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    console.log(name)
    try {
      const { data } = await axios.post("login", { name, password });
      console.log(data);
      // SET THE DATA TO REDUX
      // dispatch({ type: "SET_USER", payload: data.user });
      sessionStorage.setItem("userData", JSON.stringify(data.user));
      // NAVIGATE TO HOME PAGE
      navigate("/app/welcome");
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="login-container">
      <div className="image-container">
        <img src={logo} alt="Logo" className="welcome-logo" />
      </div>
      <div className="login-box">
        <p className="login-text">Login to your Account</p>
        <TextField
          inputRef={nameRef}
          id="outlined-basic"
          label="Enter Username"
          variant="outlined"
        />
        <TextField
          inputRef={passwordRef}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button variant="outlined" onClick={loginHandler}>
          Login
        </Button>
        <div>
          {" "}
          New user <Link to="/">SignUp</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

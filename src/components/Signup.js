import React, { useRef } from "react";
import "./styles.css";
import logo from "../Images/chat-512.png";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const Signup = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const signupHandler = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;

    // const formdata = new FormData();
    // formdata.append('name', name);
    // console.log(name);
    // formdata.append('email', email);
    // formdata.append('password',password);
    // console.log(formdata);

    const formdata={
      name:name,
      email:email,
      password:password
    }
    // console.log(formdata);


    try {
      const { data } = await axios.post("signup", formdata
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      );
      // console.log(data);
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
        <p className="login-text">Signup to App</p>
        <TextField inputRef={emailRef} id="outlined-basic" label="Enter Email" variant="outlined" />
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
        <Button variant="outlined" onClick={signupHandler}>SignUp</Button>
        <div>
          Already a user <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import { IconButton } from '@mui/material'
import React, { useContext, useRef } from 'react';
import "./styles.css";
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import { useSelector } from 'react-redux';
import { myContext } from "./MainContainer";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const CreateGroups = () => {
  const lightTheme=useSelector((state)=>state.themeKey);
  const { refresh, setRefresh } = useContext(myContext);
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const navigate = useNavigate();
  const groupnameRef=useRef('');

  const createGroup=async()=>{
    try{
      const name=groupnameRef.current.value;
      // console.log(name);
      const {data}=await axios.post("chat/createGroups",{
        name:name
      })
      // console.log(data);
      navigate("/app/groups");
      setRefresh(!refresh);
    }
    catch(err){
      alert(err.response.data.message);
    }
  }

  return (
    <div className={'createGroups-container'+((lightTheme)?"":" dark")}>
        <input placeholder='Enter Group Name' className={'search-box'+((lightTheme)?"":" dark")} ref={groupnameRef}/>
        <IconButton onClick={createGroup}>
            <DoneOutlineRoundedIcon className={"icon"+((lightTheme)?"":" dark")} />
        </IconButton>
    </div>
  )
}

export default CreateGroups;
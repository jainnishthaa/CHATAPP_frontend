import { IconButton } from '@mui/material'
import React from 'react';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import { useSelector } from 'react-redux';
const CreateGroups = () => {
  const lightTheme=useSelector((state)=>state.themeKey);
  return (
    <div className={'createGroups-container'+((lightTheme)?"":" dark")}>
        <input placeholder='Enter Group Name' className={'search-box'+((lightTheme)?"":" dark")}/>
        <IconButton>
            <DoneOutlineRoundedIcon className={"icon"+((lightTheme)?"":" dark")}/>
        </IconButton>
    </div>
  )
}

export default CreateGroups
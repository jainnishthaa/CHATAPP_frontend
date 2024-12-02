import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import MessageOthers from './MessageOthers';
import MessageSelf from './MessageSelf';
import { useSelector } from 'react-redux';

const ChatArea = () => {
    const lightTheme = useSelector((state)=>state.themeKey);
    var props={
        name:"Test 1",
        lastMessage:"Last Message 1",
        timeStamp:"today"
    };
  return (
    <div className={'chatarea-container'+((lightTheme)?"":" dark")}>
        <div className={'chatarea-header'+((lightTheme)?"":" dark")}>
            <p className={'con-icon'+((lightTheme)?"":" dark")}>{props.name[0]}</p>
            <div className={'header-text'+((lightTheme)?"":" dark")}>
            <p className={'con-title'+((lightTheme)?"":" dark")}>{props.name}</p>
                <p className={'con-timeStamp'+((lightTheme)?"":" dark")}>{props.timeStamp}</p>
            </div>
            <IconButton>
                <DeleteIcon className={"icon"+((lightTheme)?"":" dark")}/>
            </IconButton>
        </div>
        <div className={'messages-container'+((lightTheme)?"":" dark")}>
        <MessageOthers/>
        <MessageSelf/>
        <MessageOthers/>
        <MessageSelf/><MessageOthers/>
        <MessageSelf/><MessageOthers/>
        <MessageSelf/><MessageOthers/>
        <MessageSelf/><MessageOthers/>
        <MessageSelf/>
        </div>
        <div className={'text-input-area'+((lightTheme)?"":" dark")}>
            <input type='text' placeholder='Type a message...'  className={'search-box'+((lightTheme)?"":" dark")}/>
            <IconButton>
                <SendIcon className={"icon"+((lightTheme)?"":" dark")}/>
            </IconButton>
        </div>
    </div>
  )
}

export default ChatArea
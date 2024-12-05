import React, { useContext, useEffect, useRef, useState } from "react";
import "./styles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import MessageOthers from "./MessageOthers";
import MessageSelf from "./MessageSelf";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import { myContext } from "./MainContainer";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:4444";

let socket;
const ChatArea = () => {
  const lightTheme = useSelector((state) => state.themeKey);
  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);
  const messagesEndRef = useRef(null);
  const messageRef = useRef(null);
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const [allMessages, setAllMessages] = useState([]);
  const [allMessagesCopy, setAllMessagesCopy] = useState([]);
  const { refresh, setRefresh } = useContext(myContext);
  const [messageContent, setMessageContent] = useState("");
  const navigate = useNavigate();
  const dyParams = useParams();
  const [chatId, chat_user] = dyParams.id.split("&");

  // console.log(userData);
  if (!userData) {
    console.log("User not Authenticated");
    navigate("/");
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    // if (!socketConnectionStatus) {
    //   alert("Socket connection is not yet established.");
    //   return;
    // }
    const content = messageRef.current.value;
    // console.log(content);
    try {
      const { data } = await axios.post("/message", {
        content: content,
        chatId: chatId,
      });
      console.log(data);
      socket.emit("new message", { ...data, sender: userData });
      setMessageContent("");
      setRefresh(!refresh);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    console.log(socketConnectionStatus);
    socket = io(ENDPOINT);
    socket.on("connected", () => {
      setSocketConnectionStatus(true); 
      console.log("Socket connected:", socket.id);
    });
    socket.emit("setup", userData);

    socket.on("disconnect", () => {
      setSocketConnectionStatus(false);
      console.log("Socket disconnected");
    });
    console.log(socketConnectionStatus);
    // socket.on("message received", (newMessage) => {
    //   if (!allMessages.find((message) => message._id === newMessage._id)) {
    //     setAllMessages((prevMessages) => [...prevMessages, newMessage]);
    //   }
    // });
  }, []);

  useEffect(() => {
    const handleMessageReceived = (newMessage) => {
      if (!allMessages.find((message) => message._id === newMessage._id)) {
        setAllMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };
    socket.on("message received", handleMessageReceived);
    return () => {
      socket.off("message received", handleMessageReceived);
    };
  }, [allMessages]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get(`/message/${chatId}`);
        // console.log(data);
        setAllMessages(data);
        // console.log(chatId);
        scrollToBottom();
        socket.emit("join chat",chatId);
        setAllMessagesCopy(allMessages);
      } catch (err) {
        alert(err.response.data.message);
      }
    };
    getMessages();
  }, [refresh, chatId,allMessages]);

  return (
    <div className={"chatarea-container" + (lightTheme ? "" : " dark")}>
      <div className={"chatarea-header" + (lightTheme ? "" : " dark")}>
        <p className={"con-icon" + (lightTheme ? "" : " dark")}>
          {chat_user[0]}
        </p>
        <div className={"header-text" + (lightTheme ? "" : " dark")}>
          <p className={"con-title" + (lightTheme ? "" : " dark")}>
            {chat_user}
          </p>
          {/* <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
            {props.timeStamp}
          </p> */}
        </div>
        <IconButton>
          <DeleteIcon className={"icon" + (lightTheme ? "" : " dark")} />
        </IconButton>
      </div>
      <div className={"messages-container" + (lightTheme ? "" : " dark")}>
        {allMessages
          .slice(0)
          .reverse()
          .map((message, index) => {
            const sender = message.sender;
            const self_id = userData._id;
            if (sender._id === self_id) {
              return <MessageSelf props={message} key={index} />;
            } else {
              // console.log("Someone Sent it");
              return <MessageOthers props={message} key={index} />;
            }
          })}
      </div>
      <div className={"text-input-area" + (lightTheme ? "" : " dark")}>
        <input
          ref={messageRef}
          value={messageContent}
          onChange={(e) => {
            setMessageContent(e.target.value);
          }}
          onKeyDown={(event) => {
            if (event.code == "Enter") {
              sendMessage();
            }
          }}
          type="text"
          placeholder="Type a message..."
          className={"search-box" + (lightTheme ? "" : " dark")}
        />
        <IconButton onClick={sendMessage}>
          <SendIcon className={"icon" + (lightTheme ? "" : " dark")} />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatArea;

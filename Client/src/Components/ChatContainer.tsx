import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
// import ChatInput from "./ChatInput";
// import Logout from "./Logout";
import axios from "axios";
import { GET_USER_BY_ID } from "../Services/Queries/user.query";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_MESSAGES } from "../Services/Queries/chats.query";
import ChatInput from "./ChatInput";
import { ADD_MESSAGE } from "../Services/mutation/chats.mutation";
import { toast } from "react-toastify";
import Logout from "./Logout";
import { MdOutlineContacts } from "react-icons/md";

interface props {
  currentUser: string;
  chat: any;
  socket: any;
  arrivalMessage: any;
  setChatVisible: (val: boolean) => void;
}

export default function ChatContainer({
  currentUser,
  chat,
  socket,
  arrivalMessage,
  setChatVisible,
}: props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [newMessages, setNewMessages] = useState<any>(null);

  const [userData, setUserData] = useState<any>({
    name: "",
    email: "",
    _id: "",
  });

  const [messages, setMessages] = useState<any>([]);

  const [getUser, { loading, error }] = useLazyQuery(GET_USER_BY_ID, {
    onCompleted: (res) => {
      console.log("Inside Chat Box:", res.getUserByID);
      setUserData(res.getUserByID);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const [getMessages, { loading: messageLoading, error: messageError }] =
    useLazyQuery(GET_MESSAGES, {
      onCompleted: (res) => {
        console.log(res);
        console.log("Messages:", res.getMessages.results);
        setMessages(res.getMessages.results);
      },
      onError: (err) => {
        console.log(err);
      },
    });

  const [addMessageMutation] = useMutation(ADD_MESSAGE, {
    onCompleted: (res) => {
      console.log(res);
      let _data = res.addMessage;
      setMessages([...messages, _data]);

      let newData = { receiverId: userData._id, ..._data };

      socket.current.emit("send-message", newData);
    },
    onError: (err) => {
      toast.error("Unable to send message");
    },
  });

  useEffect(() => {
    if (chat) {
      getMessages({ variables: { chatId: chat._id } });
    }
  }, [chat]);

  // recieve message from socket

  useEffect(() => {
    if (arrivalMessage && arrivalMessage.chatId === chat._id) {
      if (arrivalMessage.chatId === chat._id) {
        setMessages([...messages, arrivalMessage]);
      }
    }
  }, [arrivalMessage]);

  useEffect(() => {
    if (chat !== null && chat !== undefined) {
      const userId = chat?.members.find((item: any) => item !== currentUser);
      getUser({ variables: { userID: userId } });
    }
  }, [chat, currentUser]);

  const handleChange = (newMessage: string) => {
    setNewMessages(newMessage);
  };

  const handleSendMessage = (message: string) => {
    console.log("Adding message:", message);
    addMessageMutation({
      variables: { chatId: chat._id, senderId: currentUser, text: message },
    });
  };

  // always scroll to last message

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${userData.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{userData.name}</h3>
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex" }}>
          <Logout />
          <Button
            style={{ marginRight: -10, marginLeft: 8 }}
            onClick={() => {
              console.log("Pressed");
              setChatVisible(false);
            }}
          >
            <MdOutlineContacts />
          </Button>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message: any) => {
          return (
            <div ref={scrollRef}>
              <div
                className={`message ${
                  message.senderId === currentUser ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMessage} />
    </Container>
  );
}

const Button = styled.button`
  display: none;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;

  @media screen and (min-width: 100px) and (max-width: 999px) {
    display: flex;
  }

  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

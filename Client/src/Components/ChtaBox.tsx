import { useLazyQuery } from "@apollo/client";
import React, { FC, useState, useEffect, useRef } from "react";
import { GET_USER_BY_ID } from "../Services/Queries/user.query";
import { Box } from "native-base";
import LeftChatComponent from "./LeftChatComponent";
import { GET_MESSAGES } from "../Services/Queries/chats.query";
import styled from "styled-components";
import { default_img } from "./Conversation";

interface props {
  chat: { members: [string]; _id: string };
  currentUser: string;
}

const ChtaBox: FC<props> = ({ chat, currentUser }) => {
  const scrollRef = useRef<any>();

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

  useEffect(() => {
    if (chat) {
      getMessages({ variables: { chatId: chat._id } });
    }
  }, [chat]);

  useEffect(() => {
    if (chat !== null && chat !== undefined) {
      const userId = chat?.members.find((item) => item !== currentUser);
      getUser({ variables: { userID: userId } });
    }
  }, [chat, currentUser]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={default_img} alt="" />
          </div>
          <div className="username">
            <h3>{userData.name}</h3>
          </div>
        </div>
        {/* <Logout /> */}
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
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <ChatInput handleSendMsg={handleSendMsg} /> */}
    </Container>
  );
};

export default ChtaBox;

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
    justify-content: space-between;
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

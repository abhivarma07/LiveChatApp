import {
  Avatar,
  Box,
  HStack,
  Heading,
  Icon,
  Input,
  Modal,
  Pressable,
  SearchIcon,
  Stack,
  Text,
  VStack,
  useMediaQuery,
} from "native-base";
import React, { FC, useState, useEffect, useRef } from "react";
import ChatHeader from "../Components/ChatHeader";
import { useSelector } from "react-redux";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_USER_CHATS } from "../Services/Queries/chats.query";
import Conversation from "../Components/Conversation";
import ChtaBox from "../Components/ChtaBox";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Contacts from "../Components/Contacts";
import Welcome from "../Components/Welcome";
import ChatContainer from "../Components/ChatContainer";
import { io } from "socket.io-client";

type props = {};

const Chats: FC<props> = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [chats, setChats] = useState<any>([]);
  const [currentChat, setCurrenctChat] = useState<any>(null);
  const [chatVisible, setChatVisible] = useState(true);
  const [arrivalMessage, setArrivalMessage] = useState<any>();

  const [onlineUsers, setOnlineUsers] = useState([]);
  const navigate = useNavigate();

  const socket = useRef<any>();

  useEffect(() => {
    socket.current = io("https://livechatapp-production.up.railway.app/");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users: any) => {
      setOnlineUsers(users);
      console.log("Online Users", users);
    });
  }, [user]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("recieve-message", (data: any) => {
        console.log("Socket Ran for message", data, chats);

        setArrivalMessage(data);
      });
    }
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("recieve-created-chat", (data: any) => {
        console.log("Socket Ran for message", data, chats);

        setChats([...chats, data.chat]);
      });
    }
  }, []);

  const [isSmallScreen] = useMediaQuery({
    minWidth: 1170,
  });

  const [getUserChats, { loading, error }] = useLazyQuery(GET_USER_CHATS, {
    variables: { userId: user._id },
    onCompleted: (res) => {
      console.log(res.userChats);
      setChats(res.userChats.results);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    if (user) {
      if (user.isAvatarImageSet) {
        getUserChats({ variables: { userId: user._id } });
      } else {
        navigate("/setAvatar");
      }
    }
  }, [user]);

  useEffect(() => {
    console.log(isSmallScreen);
    console.log(chats);
  }, [chats, isSmallScreen]);

  return (
    <>
      <Container visible={chatVisible}>
        <div className="container">
          <Contacts
            data={chats}
            userID={user._id}
            key={chats}
            setCurrentChat={setCurrenctChat}
            socket={socket}
            setVisible={setChatVisible}
          />
          {currentChat === null ? (
            <Welcome
              visible={chatVisible}
              setChatVisible={(val: boolean) => setChatVisible(val)}
            />
          ) : (
            <ChatContainer
              chat={chats[currentChat]}
              currentUser={user._id}
              socket={socket}
              arrivalMessage={arrivalMessage}
              setChatVisible={setChatVisible}
            />
          )}
        </div>
      </Container>
    </>
  );
};

export default Chats;

interface divProps {
  visible: boolean;
}

const Container = styled.div<divProps>`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 1000px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    @media screen and (min-width: 100px) and (max-width: 999px) {
      grid-template-columns: ${(props: divProps) =>
        props.visible ? "0% 100%" : "100% 0%"};
    }
  }
`;

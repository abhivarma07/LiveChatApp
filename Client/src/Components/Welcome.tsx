import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../utils/Assests/robot.gif";
import { useSelector } from "react-redux";
import Logout from "./Logout";
import { MdOutlineContacts } from "react-icons/md";

export default function Welcome({
  visible,
  setChatVisible,
}: {
  visible?: boolean;
  setChatVisible?: (val: boolean) => void;
}) {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <Container style={{ width: "100%" }} visible={visible}>
      <div
        style={{
          marginLeft: "auto",
          marginRight: 10,
          marginBottom: "auto",
          marginTop: 10,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Button
          onClick={() => {
            console.log("Pressed");
            typeof setChatVisible !== "undefined" && setChatVisible(!visible);
          }}
        >
          <MdOutlineContacts />
        </Button>
        <Logout />
      </div>
      <div style={{ position: "fixed" }}>
        <img src={Robot} alt="" />
        <h1>
          Welcome, <span>{user?.name || "Demo User"}!</span>
        </h1>
        <h3>Please select a chat to Start messaging.</h3>
      </div>
    </Container>
  );
}

interface props {
  visible: boolean | undefined;
}

const Container = styled.div<props>`
  display: ${(props: props) => (props.visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

const Button = styled.button`
  display: none;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;

  @media screen and (min-width: 100px) and (max-width: 999px) {
    display: flex;
  }

  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { AppDispatch } from "../app/store";

interface props {
  backgroundColor?: string;
}

export default function Logout({ backgroundColor = "#9a86f3" }: props) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = async () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <Button onClick={handleClick} backgroundColor={backgroundColor}>
      <BiPowerOff />
    </Button>
  );
}

interface buttonProps {
  backgroundColor: string;
}

const Button = styled.button<buttonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: ${(props: buttonProps) => props.backgroundColor};
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

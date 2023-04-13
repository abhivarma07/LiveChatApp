import React, { FC, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { ToastContainer, toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import SpinnerComponent from "../Components/Spinner";
import styled from "styled-components";
import Logo from "../utils/Assests/logoLiveChat.png";

export interface props {
  /* Use this as heading */
  text?: string;
  isDisabled?: boolean;
}

const Login: FC<props> = ({ text = "hello", isDisabled = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, token, loading, error, success, message } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    if (error) {
      toast.error(message);
    }

    if (success || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, error, success, message, navigate, dispatch]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);

  const handleSubmition = () => {
    if (email.trim() === "") {
      toast.warn("Email is needed");
      return;
    }

    if (password.trim() === "") {
      toast.warn("Password is needed");
      return;
    }

    dispatch(login({ email, password }));
  };

  if (loading) {
    return (
      <div style={{ height: "100vh", width: "100%", backgroundColor: "black" }}>
        <SpinnerComponent sideText="Loggin In" />;
      </div>
    );
  }

  return (
    <>
      <FormContainer>
        <form action="">
          <div className="brand">
            <img src={Logo} alt="logo" />
          </div>
          <input
            type="text"
            placeholder="Email"
            name="username"
            onChange={(e) => setEmail(e.target.value)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            onClick={() => handleSubmition()}
            disabled={isDisabled}
          >
            Log In
          </button>
          <span>
            Don't have an account ? <Link to="/signUp">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;

      @media screen and (min-width: 330px) and (max-width: 550px) {
        height: 3rem;
      }

      @media screen and (min-width: 100px) and (max-width: 330px) {
        height: 1.5rem;
      }
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
    align-items: center;

    @media screen and (min-width: 300px) and (max-width: 550px) {
      padding: 4rem;
    }
    @media screen and (min-width: 100px) and (max-width: 330px) {
      padding: 2rem;
    }
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    align-self: center;
    width: 15rem;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    align-self: center;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login;

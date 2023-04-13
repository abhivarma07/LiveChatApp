import React, { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { USER, UserAuth, registerUser } from "../features/auth/authSlice";
import { register, reset } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { AppDispatch } from "../app/store";
import SpinnerComponent from "../Components/Spinner";
import styled from "styled-components";
import Logo from "../utils/Assests/logoLiveChat.png";

export interface props {
  /* Use this as heading */
  text?: string;
  isDisabled?: boolean;
}

const SignUp: FC<props> = ({ text = "hello", isDisabled = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, token, loading, error, success, message } = useSelector(
    (state: any) => state.auth
  );

  const [formData, setFormData] = useState({
    name: { value: "", error: "" },
    email: { value: "", error: "" },
    password: { value: "", error: "" },
    confirmPass: { value: "", error: "" },
  });

  const [show, setShow] = useState(false);

  const handleValueChange = (key: string, value: string) => {
    let x: any = formData;
    x[key].value = value;
    x[key].error = "";

    setFormData((props: any) => {
      return {
        ...x,
      };
    });
  };

  const handleError = (key: string, value: string) => {
    let x: any = formData;
    x[key].error = value;
    setFormData((props: any) => {
      return {
        ...x,
      };
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(message);
    }

    if (success || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, error, success, message, navigate, dispatch]);

  const handleContinue = async () => {
    let error = false;

    if (formData.name.value.trim().length === 0) {
      handleError("name", "First name cannot be empty");
      error = true;
    }
    if (formData.email.value.trim().length === 0) {
      error = true;
      handleError("email", "Email name cannot be empty");
    }
    if (formData.password.value.trim().length === 0) {
      error = true;
      handleError("password", "Password cannot be empty");
    }
    if (formData.confirmPass.value.trim().length === 0) {
      error = true;
      handleError("confirmPass", "Confirm cannot be empty");
    }
    if (formData.confirmPass.value !== formData.password.value) {
      error = true;
      toast.warn("Passwords must match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (!error) {
      let data: registerUser = {
        name: formData.name.value,
        email: formData.email.value,
        password: formData.password.value,
      };

      dispatch(register(data));
    }
  };

  if (loading) {
    return (
      <div style={{ height: "100vh", width: "100%", backgroundColor: "black" }}>
        <SpinnerComponent sideText="Loading" />
      </div>
    );
  }

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={() => handleContinue()}>
          <div className="brand">
            <img src={Logo} alt="logo" />
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleValueChange("name", e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleValueChange("email", e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleValueChange("password", e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleValueChange("confirmPass", e.target.value)}
          />
          <button type="submit" disabled={isDisabled}>
            Create User
          </button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

export default SignUp;

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
    padding: 3rem 5rem;
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
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

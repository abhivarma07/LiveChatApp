import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
// import loader from "../assets/loader.gif";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_AVATAR } from "../Services/mutation/user.mutation";
import { demoAvatars } from "../utils/contants";
import SpinnerComponent from "./Spinner";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";

window.unescape = window.unescape || window.decodeURI;

export default function SetAvatar() {
  const api = `https://api.multiavatar.com/`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState<any>(undefined);
  const [svgElemet, setSvgElement] = useState<any>();

  const seeds = [];

  const dispatch = useDispatch();

  const [updateAvatar, { loading, error }] = useMutation(UPDATE_AVATAR, {
    onCompleted: (res) => {
      console.log("User", res.setAvatar.user);
      let _data = res.setAvatar;

      if (_data.status == "201") {
        localStorage.setItem("user", JSON.stringify(_data.user));
        dispatch(setUser(_data.user));
        navigate("/");
      }
    },
    onError: (err) => {
      console.log(err);
      toast.error("Error setting avatar. Please try again.", toastOptions);
    },
  });

  const toastOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      updateAvatar({ variables: { avatar: avatars[selectedAvatar] } });
    }
  };

  const getAvatar = async () => {
    const data = [];
    let image: any = "";

    for (let i = 0; i < 4; i++) {
      const random = Math.random() * 2000;

      await axios
        .get(
          `https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${random}?backgroundType=gradientLinear`
        )
        .then(function (response) {
          image = response.data;
        });
      const buffer = Buffer.from(image).toString("base64");
      data.push(buffer);
    }
    setAvatars(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getAvatar();
  }, []);
  return (
    <>
      {isLoading ? (
        <Container
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{ height: "100vh", width: "100%", backgroundColor: "black" }}
          >
            <SpinnerComponent sideText="Getting personalised Avatar for you" />
          </div>
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Personalised avatar for you</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar: any, index: any) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Start chatting now !!!
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
        border-radius: 5rem;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
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
`;

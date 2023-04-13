import { useQuery } from "@apollo/client";
import React, { FC, useState } from "react";
import { GET_USER_BY_ID } from "../Services/Queries/user.query";

interface props {
  userID: string;
}

const default_img =
  "https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2876&q=80";

const LeftChatComponent: FC<props> = ({ userID }) => {
  React.useEffect(() => {
    console.log("USER ID IN LEFT CHAT", userID);
  });

  const [userData, setUserData] = useState<any>({
    name: "",
    email: "",
    _id: "",
    avatarImage: "",
  });

  const { loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { userID: userID },
    onCompleted: (res) => {
      console.log("User Data", res);
      setUserData(res.getUserByID);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <>
      <div className="avatar">
        <img
          src={
            userData.avatarImage
              ? `data:image/svg+xml;base64,${userData.avatarImage}`
              : default_img
          }
          alt=""
        />
      </div>
      <div className="username">
        <h3>{userData.name}</h3>
      </div>
    </>
  );
};

export default LeftChatComponent;

import { useLazyQuery, useQuery } from "@apollo/client";
import { Avatar, HStack, Heading, Skeleton, Text, VStack } from "native-base";
import React, { FC, useState, useEffect } from "react";
import { GET_USER_BY_ID } from "../Services/Queries/user.query";
import LeftChatComponent from "./LeftChatComponent";
import SpinnerComponent from "./Spinner";

interface props {
  data: { members: [string]; _id: string };
  userID: string;
}

export const default_img =
  "https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2876&q=80";

const Conversation: FC<props> = ({ data, userID }) => {
  const [userData, setUserData] = useState<any>({
    name: "",
    email: "",
    _id: "",
  });

  const [currentUser, setCurrentUser] = useState<any>("");

  const [getUser, { loading, error }] = useLazyQuery(GET_USER_BY_ID, {
    onCompleted: (res) => {
      console.log(res.getUserByID);
      setUserData(res.getUserByID);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    const userId = data.members.find((item) => item !== userID);
    setCurrentUser(userId);
    getUser({ variables: { userID: userId } });
  }, []);

  return (
    <>
      {loading ? (
        <HStack mt={"2"}>
          <SpinnerComponent />
        </HStack>
      ) : (
        <LeftChatComponent userID={currentUser} />
      )}
    </>
  );
};

export default Conversation;

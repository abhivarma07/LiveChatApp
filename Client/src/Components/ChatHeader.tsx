import { Avatar, HStack, Heading, Pressable } from "native-base";
import React, { FC } from "react";

interface props {
  /** Color of the avatar if picture is unable to load*/
  bgColor?: string;

  /** Size of the avatar*/
  size?: "sm" | "md" | "lg" | "xl" | "xs";

  /** Text displayed within avatar if picture is unavailable */
  text?: string;

  /** String/url for the loadder */
  uri?: string;

  /** Name of the person for avatar */
  name: string;
}

const ChatHeader: FC<props> = ({
  name,
  bgColor = "blue.200",
  size = "md",
  text = "RS",
  uri = "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
}) => {
  return (
    <HStack alignItems={"center"}>
      <Pressable>
        <Avatar
          alignSelf="center"
          bg={bgColor}
          size={size}
          source={{
            uri: uri,
          }}
        >
          {text}
        </Avatar>
      </Pressable>
      <Heading size={"md"} ml="2">
        {name}
      </Heading>
    </HStack>
  );
};

export default ChatHeader;

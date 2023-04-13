import React, { FC } from "react";
import { HStack, Spinner, Heading, NativeBaseProvider } from "native-base";

export interface SpinnerComponentProps {
  color?: string;
  sideText?: string;
  size?: "sm" | "lg";
}

/**
 * Primary UI spinner component for loading
 */
const SpinnerComponent: FC<SpinnerComponentProps> = ({
  color = "primary.500",
  sideText,
  size = "lg",
}) => {
  return (
    <NativeBaseProvider>
      <HStack
        space={2}
        justifyContent="center"
        alignItems={"center"}
        height={"100%"}
      >
        <Spinner accessibilityLabel="Loading" color={color} size={size} />
        {sideText && (
          <Heading color="primary.500" fontSize="md">
            {sideText}
          </Heading>
        )}
      </HStack>
    </NativeBaseProvider>
  );
};

export default SpinnerComponent;

import type { Meta, StoryObj } from "@storybook/react";

import Login from "../Pages/login";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { ApolloProvider } from "@apollo/client";
import client from "../Services/apollo";
import Chats from "../Pages/Chat";
import { NativeBaseProvider } from "native-base";
import SetAvatar from "../Components/setAvatar";

const meta = {
  title: "Pages/Avatar",
  component: SetAvatar,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <NativeBaseProvider>
        <MemoryRouter initialEntries={["/"]}>
          <Provider store={store}>
            <ApolloProvider client={client}>
              <Story />
            </ApolloProvider>
          </Provider>
        </MemoryRouter>
      </NativeBaseProvider>
    ),
  ],
} satisfies Meta<typeof Login>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {};

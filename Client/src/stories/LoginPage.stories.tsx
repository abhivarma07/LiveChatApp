import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";

import Login from "../Pages/login";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { ToastContainer } from "react-toastify";

const meta = {
  title: "Pages/login",
  component: Login,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <Story />
        </Provider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Login>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginIn: Story = {
  args: {
    isDisabled: true,
  },
};

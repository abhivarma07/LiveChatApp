import type { Meta, StoryObj } from "@storybook/react";
import Logout from "../Components/Logout";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../app/store";
import styled from "styled-components";

// Receive a component and apply a bordered container with max width of 400px.

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction

const meta = {
  title: "Components/Logout",
  component: Logout,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
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
} satisfies Meta<typeof Logout>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
  args: {
    backgroundColor: "#9a86f3",
  },
};

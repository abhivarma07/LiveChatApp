import type { Meta, StoryObj } from "@storybook/react";
import Logout from "../Components/Logout";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../app/store";
import styled from "styled-components";
import Welcome from "../Components/Welcome";

// Receive a component and apply a bordered container with max width of 400px.

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction

const Container = styled.div`
  height: 90vh;
  width: 90vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 1000px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

const meta = {
  title: "Components/Welcome",
  component: Welcome,
  argTypes: {
    visible: { defaultValue: "true" },
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <Container>
            <Story />
          </Container>
        </Provider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Welcome>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
  args: {
    visible: true,
  },
};

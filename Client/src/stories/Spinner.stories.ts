import type { Meta, StoryObj } from "@storybook/react";
import SpinnerComponent from "../Components/Spinner";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Components/Spinner",
  component: SpinnerComponent,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["sm", "lg"],
    },
  },
} satisfies Meta<typeof SpinnerComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: "blue.400",
    size: "sm",
    sideText: "Loading",
  },
};

export const Secondary: Story = {
  args: {
    color: "warning.400",
    size: "sm",
    sideText: "Loading",
  },
};

export const Large: Story = {
  args: {
    color: "blue.400",
    size: "lg",
    sideText: "Loading",
  },
};

export const Small: Story = {
  args: {
    color: "indigo.400",
    size: "sm",
    sideText: "Loading",
  },
};

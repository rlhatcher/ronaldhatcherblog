import type { Preview } from "@storybook/react";
import "../app/globals.css";
import { inter, courier } from "../app/lib/fonts";
import React from "react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={`${inter.variable} ${courier.variable}`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
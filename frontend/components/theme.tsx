import React, {ReactNode} from "react";
import { ThemeProvider } from "styled-components";

const theme = {
    colors: {
        white: '#ffffff',
        cryptoGreen: '#3FE3C8'
    },
    /*fonts: ["sans-serif", "Roboto"],
    fontSizes: {
        small: "1em",
        medium: "2em",
        large: "3em"
    }*/
};

const Theme = ({ children }: {children: ReactNode}) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
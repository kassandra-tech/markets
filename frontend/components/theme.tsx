import React, {ReactNode} from "react";
import { ThemeProvider } from "styled-components";

const theme = {
    colors: {
        white: '#ffffff',
        secondaryWhite: 'rgba(255, 255, 255, 0.3)',
        cryptoGreen: '#3FE3C8',
        superRed: '#F72A4C',
        yellow: '#EBD539',
        grey: 'rgba(255, 255, 255, 0.6)'
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
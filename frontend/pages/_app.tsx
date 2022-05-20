import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Theme from "../components/theme";
import {useEffect, useState} from "react";

function MyApp({ Component, pageProps }: AppProps) {

    const [isSSR, setIsSSR] = useState(true);
    // https://github.com/vercel/next.js/discussions/35773#discussioncomment-2485078
    useEffect(() => {
        setIsSSR(false);
    }, []);

    return <>
        {!isSSR && <Theme>
            <Component {...pageProps} />
        </Theme>}
    </>
}

export default MyApp;

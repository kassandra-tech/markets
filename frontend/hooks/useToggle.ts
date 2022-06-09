import {useState} from "react";

export default function useToggle() {
    const [toggleFlag, setToggleFlag] = useState<boolean>(false);

    const switchToggle = () => setToggleFlag(!toggleFlag);

    return { toggleFlag, switchToggle}
}
import {useState} from "react";

export default function useToggle() {
    const [toggleFlag, setToggleFlag] = useState<boolean>(false);

    const switchToggle = () => {
        console.log('toggleFlag');
        setToggleFlag(!toggleFlag);
    }

    return { toggleFlag, switchToggle}
}
import {useEffect} from "react";

export default function useEffectKeyPress(handleEventFunc, deps = []) {

    // If pressed key is our target key then set to true
    function handleKeyPress({key}) {
        handleEventFunc(key);
    }

    // Add event listeners
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, deps); // Empty array ensures that effect is only run on mount and unmount

    return null;
}
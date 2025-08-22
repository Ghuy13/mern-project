import { useEffect, useState } from "react";
export const useDebounce = (value, delay) => {
    const [valueDebounced, setValueDebounced] = useState('');
    useEffect(() => {
        const handle = setTimeout(() => {
            setValueDebounced(value);
        }, [delay])
        return () => {
            clearTimeout(handle);
        }
    }, [value])
    return valueDebounced;
}
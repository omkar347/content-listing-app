import { memo, useEffect, useRef } from "react";

const Input = (props) => {
    const propsInput = {
        ...props,
        ref: useRef()
    }
    useEffect(() => {
        propsInput.ref && propsInput.ref.current && propsInput.ref.current.focus();
    }, []);
    return <input {...propsInput} />
}
export default memo(Input);
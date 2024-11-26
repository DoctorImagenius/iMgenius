import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

const TypedText = ({ stringsArray }) => {
    const typedElement = useRef(null);

    useEffect(() => {
        const options = {
            strings: stringsArray,
            typeSpeed: 70,
            backSpeed: 20,
            loop: true,
            showCursor: false 
        };
        const typed = new Typed(typedElement.current, options);
        return () => {
            typed.destroy();
        };
    }, [stringsArray]);

    return (
        <div>
            <span ref={typedElement} style={{border:"1px solid blue",padding:"10px 10px", borderRadius:"50px"}}></span>
        </div>
    );
};

export default TypedText;

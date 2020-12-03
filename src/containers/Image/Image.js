import React from "react";

export default function Image({url, alt}) {
    return (
        <li>
            <img src={url} alt={alt}/>
        </li>
    )
}
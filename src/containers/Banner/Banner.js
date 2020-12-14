import React from "react";
import './Banner.scss'
import {useSelector} from "react-redux";

export default function Banner() {
    return (
        <div id={'myBanner'} className={'banner'} >
            <h1><span style={{color: 'red'}}>Red</span><span>D store</span></h1>
        </div>
    )

}
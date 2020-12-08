import React from "react";
import './Banner.scss'
import {useSelector} from "react-redux";

export default function Banner() {
    const theme = useSelector(state => state.theme);
    return (
        <div className={'banner'} >
            <h1><span style={{color: 'red'}}>Red</span><span style={{color: theme ==='light' ? 'black' : 'white'}}>D store</span></h1>
        </div>
    )

}
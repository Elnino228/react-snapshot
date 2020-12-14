import React, {useContext} from "react";
import './Loader.scss'
import {PhotoContext} from "../../context/PhotoContext";


export default function Loader() {
    const {loading} = useContext(PhotoContext);

    return (
        <>
            <div className={`layout-mask ${loading ? 'enable' : ''}`}>
            </div>
            <div className={`loader ${loading ? 'enable' : ''}`}/>
        </>
    )
}
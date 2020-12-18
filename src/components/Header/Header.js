import React from 'react';
import './Header.scss'
import {useDispatch, useSelector} from "react-redux";
import * as themeAction from '../../redux/actions/themeAction'
import {Link} from "react-router-dom";
import {openSidebar} from "../Sidebar/Sidebar";
import MenuProfile from "../MenuProfile/MenuProfile";

export default function Header() {
    const dispatch = useDispatch();
    const handleSwitchTheme = () => {
        dispatch(themeAction.switchTheme());
    };
    return (
        <>
            <div id={'myHeader'} className={'header'}>
                <span id={'mySidebarOpenBtn'} className={'sidebar-open-btn'} onClick={openSidebar}>&#9776;</span>
                <div id={'myBrandName'} className={'brand-name'}>
                    <Link to={'/mountain'}>
                        <span style={{color: 'red'}}>Red</span><span>D store</span>
                    </Link>
                </div>
                <div className={'toggle-theme'}>
                    <label className={'switch'}>
                        <input className={'toggle-button'} type="checkbox" onChange={handleSwitchTheme}/>
                        <span className={'slider round'}/>
                    </label>
                </div>
                <MenuProfile/>
            </div>
            <div className={'header-hide'}/>
        </>
    )
}
import React from 'react';
import './Header.scss'
import {useDispatch, useSelector} from "react-redux";
import * as themeAction from '../../redux/actions/themeAction'
import {Link} from "react-router-dom";
import {openSidebar} from "../Sidebar/Sidebar";

export default function Header() {
    const dispatch = useDispatch();
    const handleSwitchTheme = () => {
        dispatch(themeAction.switchTheme());
    };
    const theme = useSelector(state => state.theme);
    return (
        <div className={'header'} style={{backgroundColor: theme === 'light' ? 'black' : 'white'}}>
            <span className={'sidebar-open-btn'} onClick={openSidebar}>&#9776;</span>
            <div className={'brand-name'}>
                <Link to={'/mountain'}>
                    <span style={{color: 'red'}}>Red</span><span style={{color: theme === 'light' ? 'white' : 'black'}}>D store</span>
                </Link>
            </div>
            <div className={'toggle-theme'}>
                <label className={'switch'}>
                    <input className={'toggle-button'} type="checkbox" onChange={handleSwitchTheme}/>
                    <span className={'slider round'}/>
                </label>
            </div>
        </div>
    )
}
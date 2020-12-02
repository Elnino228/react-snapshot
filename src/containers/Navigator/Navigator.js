import {NavLink} from "react-router-dom";
import React from "react";
import './Navigator.scss'

export default function Navigator() {
    return (
        <nav className={'navigator'}>
            <ul>
                <li><NavLink to={'/mountain'}>Mountain</NavLink></li>
                <li><NavLink to={'/beach'}>Beaches</NavLink></li>
                <li><NavLink to={'/bird'}>Bird</NavLink></li>
                <li><NavLink to={'/food'}>Food</NavLink></li>
            </ul>
        </nav>
    )
}
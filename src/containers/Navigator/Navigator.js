import {NavLink} from "react-router-dom";
import React from "react";
import './Navigator.scss'

export default function Navigator() {
    return (
        <nav className={'navigator'}>
            <ul>
                <li><NavLink activeClassName={'active-nav'} to={'/mountain'}>Mountain</NavLink></li>
                <li><NavLink activeClassName={'active-nav'} to={'/beach'}>Beaches</NavLink></li>
                <li><NavLink activeClassName={'active-nav'} to={'/bird'}>Bird</NavLink></li>
                <li><NavLink activeClassName={'active-nav'} to={'/food'}>Food</NavLink></li>
            </ul>
        </nav>
    )
}
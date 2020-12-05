import React from 'react';
import './Header.scss'

export default function Header() {
    return (
        <div className={'header'}>
            <label className={'switch'}>
                <input className={'toggle-button'} type="checkbox"/>
                <span className={'slider round'}/>
            </label>
            <h1><span style={{color: 'red'}}>Red</span><span style={{color: 'black'}}>D store</span></h1>
        </div>
    )
}
import React from 'react';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import './App.scss'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Navigator from "../Navigator/Navigator";

export default function App() {
    return (
        <div className={'app'}>
            <HashRouter>
                <Header title={'Snapshot'}/>
                <SearchForm/>
                <Navigator/>
            </HashRouter>
        </div>
    )
}
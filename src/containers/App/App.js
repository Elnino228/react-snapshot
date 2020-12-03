import React from 'react';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import './App.scss'
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Navigator from "../Navigator/Navigator";

export default function App() {
    return (
        <div className={'app'}>
            <BrowserRouter basename={'SnapShot1'}>
                <Route render={props => (
                    <>
                        <Header title={'Snapshot'}/>
                        <SearchForm/>
                        <Navigator/>
                    </>
                )}/>
            </BrowserRouter>
        </div>
    )
}
import React from 'react';
import './App.scss'
import {Redirect, Route, Switch} from "react-router-dom";
import Container from "../Container/Container";
import NotFound from "../NotFound/NotFound";
import {useSelector} from "react-redux";
import * as Constant from "../../Constants/Constants";

export default function App() {
    return (
        // <Test/>
        <>
            <Switch>
                <Route
                    exact
                    path={'/'}
                    render={() => <Redirect to={`/${Constant.DEFAULT_SEARCH}`}/>}
                />
                <Route
                    path={'/:tag'}
                    render={() => <Container/>}
                />
                <Route render={() => <NotFound/>}/>)} />
            </Switch>
        </>
    )
}
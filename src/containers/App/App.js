import React from 'react';
import './App.scss'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Container from "../Container/Container";
import NotFound from "../NotFound/NotFound";
import PhotoContextProvider from "../../context/PhotoContext";
import Loader from "../Loader/Loader";
import {useSelector} from "react-redux";
import Header from "../Header/Header";
import * as Constant from "../../Constants/Constants";

export default function App() {
    const theme = useSelector(state => state.theme);
    return (
        // <Test/>
        <PhotoContextProvider>
            <div className={`app ${theme}`}>
                <BrowserRouter basename={'snapshot'}>
                    <Loader/>
                    <Header/>
                    <div className={'header-hide'}> </div>
                    <Switch>
                        <Route
                            exact
                            path={'/'}
                            render={() => <Redirect to={`/${Constant.DEFAULT_SEARCH}`}/>}
                        />
                        <Route
                            path={'/search/:keySearch'}
                            render={() => (<Container/>)}
                        />
                        <Route
                            path={'/:tag'}
                            render={() => <Container/>}
                        />
                        <Route render={() => <NotFound/>}/>)} />
                    </Switch>
                </BrowserRouter>
            </div>
        </PhotoContextProvider>
    )
}
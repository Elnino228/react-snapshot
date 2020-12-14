import React from 'react';
import './App.scss'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Container from "../Container/Container";
import NotFound from "../NotFound/NotFound";
import PhotoContextProvider from "../../context/PhotoContext";
import Loader from "../../components/Loader/Loader";
import {useSelector} from "react-redux";
import Header from "../../components/Header/Header";
import * as Constant from "../../Constants/Constants";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import Sidebar from "../../components/Sidebar/Sidebar";
import Dialog, {showDialog} from "../../components/Dialog/Dialog";

export default function App() {
    const theme = useSelector(state => state.theme);
    return (
        // <Test/>
        <PhotoContextProvider>
            <div className={`app ${theme}`}>
                <BrowserRouter basename={'snapshot'}>
                    <ScrollToTop/>
                    <Loader/>
                    <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
                        Launch demo modal
                    </button>
                    <Dialog />
                    <Header/>
                    <Sidebar/>
                    <div className={'header-hide'}> </div>
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
                </BrowserRouter>
            </div>
        </PhotoContextProvider>
    )
}
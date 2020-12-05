import React, {useEffect, useState} from 'react';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import './App.scss'
import {BrowserRouter, HashRouter, Route, Switch, Redirect} from "react-router-dom";
import Navigator from "../Navigator/Navigator";
import Container from "../Container/Container";
import NotFound from "../NotFound/NotFound";
import PhotoContextProvider from "../../context/PhotoContext";
import Loader from "../Loader/Loader";

function Test() {
    const [content, setContent] = useState({t: 1});
    useEffect(() => {
        console.log(content)
        // setContent('is mount')
    });
    useEffect(() => {
        console.log(content)
        // setContent('is mount')
    }, []);
    useEffect(() => {
        console.log(content)
        // setContent('is mount')
    }, [content]);

    const handleChange = () => {
        setContent(content => {content.t = 2; return content})
    };
    return (
        <div>
            <button onClick={handleChange}>{content.t}</button>
        </div>

    )
}

export default function App() {
    return (
        // <Test/>
        <PhotoContextProvider>
            <div className={'app'}>
                <BrowserRouter basename={'snapshot'}>
                    {/*<Route render={props => (*/}
                    {/*    <>*/}
                    {/*        <Header title={'Snapshot'}/>*/}
                    {/*        <SearchForm {...props}/>*/}
                    {/*        <Navigator/>*/}
                    {/*    </>*/}
                    {/*)}/>*/}
                    <Loader/>
                    <Switch>
                        <Route
                            exact
                            path={'/'}
                            render={() => <Redirect to={'/mountain'}/>}
                        />
                        <Route
                            path={'/mountain'}
                            render={() => <Container keySearch={'mountain'}/>}
                        />
                        <Route
                            path={'/beach'}
                            render={() => (<Container keySearch={'beach'}/>)}
                        />
                        <Route
                            path={'/bird'}
                            render={() => (<Container keySearch={'bird'}/>)}
                        />
                        <Route
                            path={'/food'}
                            render={() => (<Container keySearch={'food'}/>)}
                        />
                        <Route
                            path={'/search/:keySearch'}
                            render={(props) => {
                                console.log(props);
                                return (<Container keySearch={props.match.params.keySearch}/>)
                            }}
                        />
                        <Route render={() => <NotFound/>}/>)} />
                    </Switch>
                </BrowserRouter>
            </div>
        </PhotoContextProvider>
    )
}
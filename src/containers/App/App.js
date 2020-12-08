import React, {useEffect, useState} from 'react';
import './App.scss'
import {BrowserRouter, Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import Container from "../Container/Container";
import NotFound from "../NotFound/NotFound";
import PhotoContextProvider from "../../context/PhotoContext";
import Loader from "../Loader/Loader";
import {useSelector} from "react-redux";
import DetailImage from "../DetailImage/DetailImage";

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
        setContent(content => {
            content.t = 2;
            return content
        })
    };
    return (
        <div>
            <button onClick={handleChange}>{content.t}</button>
        </div>

    )
}

export default function App() {
    const theme = useSelector(state => state.theme);
    return (
        // <Test/>
        <PhotoContextProvider>
            <div className={`app ${theme}`}>
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
import React, {Suspense} from 'react';
import './i18n/i18n'
import ReactDOM from 'react-dom';
import {Provider, useSelector} from "react-redux";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Loader from "./components/Loader/Loader";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginForm from "./containers/LoginForm/LoginForm";
import PrivateRoute from "./components/PrivateRoute";
import App from "./containers/App/App";
import Dialog from "./components/Dialog/Dialog";
import PhotoContextProvider from "./context/PhotoContext";
// import './index.css';
import store from "./redux/store";

// import App from './App';


function AppPhoto() {
    const theme = useSelector(state => state.theme);
    return (
        <PhotoContextProvider>
            <div className={`app ${theme}`}>
                <BrowserRouter basename={'snapshot'}>
                    <>
                        <ScrollToTop/>
                        <Loader/>
                        <Header/>
                        <Sidebar/>
                        <Dialog/>
                        <Suspense fallback="">
                            <Switch>
                                <Route path="/login" exact component={LoginForm}/>
                                <PrivateRoute path="/" component={App}/>
                            </Switch>
                        </Suspense>
                    </>
                </BrowserRouter>
            </div>
        </PhotoContextProvider>
    )
}

ReactDOM.render(
    <Provider store={store}>
        <AppPhoto/>
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

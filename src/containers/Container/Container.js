import React, {useContext, useEffect, useState} from "react";
import {PhotoContext} from "../../context/PhotoContext";
import Loader from "../Loader/Loader";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Navigator from "../Navigator/Navigator";
import Gallery from "../Gallery/Gallery";
import {debounce} from 'debounce';
import useInfiniteScroll from "../../customHooks/useInfiniteScroll";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import DetailImage from "../DetailImage/DetailImage";
import Banner from "../Banner/Banner";

export default function Container({keySearch}) {
    let {images, loading, runSearch} = useContext(PhotoContext);

    const loadData = (keySearch, page) => {
        runSearch(keySearch, page);
    };

    useInfiniteScroll({keySearch, startPage: 1}, loadData);
    const {path} = useRouteMatch();

    return (
        <div className={'container'}>
            <Switch>
                <Route
                    path={`${path}/:imageId`}
                    render={() => <DetailImage/>}
                />
                <Route>
                    <Banner/>
                    <SearchForm/>
                    <Navigator/>
                    <h2>{keySearch} Pictures</h2>
                    {<Gallery data={images}/>}
                </Route>
            </Switch>
        </div>
    )
}
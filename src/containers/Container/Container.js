import React, {useContext, useEffect} from "react";
import SearchForm from "../SearchForm/SearchForm";
import Navigator from "../Navigator/Navigator";
import Gallery from "../Gallery/Gallery";
import {Route, Switch, useRouteMatch, useParams, BrowserRouter} from "react-router-dom";
import DetailImage from "../DetailImage/DetailImage";
import Banner from "../Banner/Banner";
import './Container.scss'
import {PhotoContext} from "../../context/PhotoContext";
import useInfiniteScroll from "../../customHooks/useInfiniteScroll";
import {showDialog} from "../../components/Dialog/Dialog";

export default function Container(props) {
    const {path} = useRouteMatch();
    const {tag} = useParams();
    const {images, service} = useContext(PhotoContext);
    const loadData = (keySearch, page) => {
        service.runSearch(keySearch, page);
    };

    useInfiniteScroll({keySearch: tag, startPage: 1}, loadData);

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
                    <h2>{tag} Pictures</h2>
                    <Gallery data={images}/>
                </Route>
            </Switch>
        </div>
    )
}
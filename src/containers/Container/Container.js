import React, {useEffect} from "react";
import SearchForm from "../SearchForm/SearchForm";
import Navigator from "../Navigator/Navigator";
import Gallery from "../Gallery/Gallery";
import {Route, Switch, useRouteMatch, useParams} from "react-router-dom";
import DetailImage from "../DetailImage/DetailImage";
import Banner from "../Banner/Banner";
import './Container.scss'

export default function Container(props) {
    const {path} = useRouteMatch();
    const {tag} = useParams();

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
                    <Gallery/>
                </Route>
            </Switch>
        </div>
    )
}